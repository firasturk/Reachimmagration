// Cloudflare Pages Function: receives the consultation form at POST /api/lead and forwards it to the CRM.
// Set CRM_WEBHOOK_URL in the Pages project (Settings → Environment variables; Salesforce web-to-lead proxy, Zapier/Make
// hook, or your own endpoint). Nothing is stored here. Without the variable it answers 501 so a missing setup is obvious.
// Same logic as api/lead.ts (the Vercel version) — keep the two in step until Vercel is retired.
interface Env { CRM_WEBHOOK_URL?: string }
const REQUIRED = ['firstName', 'lastName', 'mobile', 'email', 'nationality', 'branch'] as const;
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  let body: Record<string, any> = {};
  try { body = (await request.json()) ?? {}; } catch { return json(400, { ok: false, error: 'bad_json' }); }
  if (body.company) return json(200, { ok: true });                                   // honeypot: bots fill it, people never see it
  const missing = REQUIRED.filter((k) => !String(body[k] ?? '').trim());
  if (missing.length) return json(422, { ok: false, error: 'missing_fields', fields: missing });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(body.email)) return json(422, { ok: false, error: 'bad_email' });

  const url = env.CRM_WEBHOOK_URL;
  if (!url) return json(501, { ok: false, error: 'crm_not_configured' });
  const lead = {
    firstName: body.firstName, lastName: body.lastName, mobile: body.mobile, email: body.email,
    nationality: body.nationality, branch: body.branch, goal: body.goal ?? '', destination: body.destination ?? '',
    meetsMinimum: body.meetsMinimum === true, newsletter: body.newsletter === true,
    language: body.language ?? 'en', page: body.page ?? '', submittedAt: new Date().toISOString(),
  };
  const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(lead) });
  return r.ok ? json(200, { ok: true }) : json(502, { ok: false, error: 'crm_rejected' });
};
export const onRequest = (ctx: { request: Request; env: Env }) => (ctx.request.method === "POST" ? onRequestPost(ctx) : json(405, { ok: false, error: "method_not_allowed" }));
