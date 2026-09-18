// Vercel serverless function: receives the consultation form and forwards it to the CRM.
// Set CRM_WEBHOOK_URL in the Vercel project (Salesforce web-to-lead proxy, Zapier/Make hook, or your own endpoint).
// Nothing is stored here. Without the env var the function answers 501 so a missing setup is obvious in testing.
// Minimal request/response shapes so the function has no dependencies to install.
interface VercelRequest { method?: string; body?: unknown }
interface VercelResponse { status(code: number): VercelResponse; json(body: unknown): void }

const REQUIRED = ['firstName', 'lastName', 'mobile', 'email', 'nationality', 'branch'] as const;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  const body = ((typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) ?? {}) as Record<string, any>;
  if (body.company) return res.status(200).json({ ok: true }); // honeypot: bots fill it, people never see it
  const missing = REQUIRED.filter((k) => !String(body[k] ?? '').trim());
  if (missing.length) return res.status(422).json({ ok: false, error: 'missing_fields', fields: missing });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(body.email)) return res.status(422).json({ ok: false, error: 'bad_email' });

  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return res.status(501).json({ ok: false, error: 'crm_not_configured' });
  const lead = {
    firstName: body.firstName, lastName: body.lastName, mobile: body.mobile, email: body.email,
    nationality: body.nationality, branch: body.branch, goal: body.goal ?? '', destination: body.destination ?? '',
    meetsMinimum: body.meetsMinimum === true, newsletter: body.newsletter === true,
    language: body.language ?? 'en', page: body.page ?? '', submittedAt: new Date().toISOString(),
  };
  const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(lead) });
  return r.ok ? res.status(200).json({ ok: true }) : res.status(502).json({ ok: false, error: 'crm_rejected' });
}
