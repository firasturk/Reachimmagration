// Smart consultation form. Progressive enhancement: without this file the form is one plain page that still posts.
import type {} from './bridge';

export function initForm() {
  const form = document.getElementById('leadForm') as HTMLFormElement | null; if (!form) return;
  const steps = Array.from(form.querySelectorAll<HTMLFieldSetElement>('.lead-step'));
  const dots = Array.from(form.querySelectorAll<HTMLElement>('[data-step-dot]'));
  const back = document.getElementById('leadBack') as HTMLButtonElement, next = document.getElementById('leadNext') as HTMLButtonElement, send = document.getElementById('leadSend') as HTMLButtonElement;
  const err = document.getElementById('leadError')!, done = document.getElementById('leadDone')!, note = document.getElementById('budgetNote')!;
  const hint = document.getElementById('branchHint')!;
  const msg = form.dataset; let cur = 0;
  form.classList.add('enhanced');

  const field = <T extends HTMLElement>(n: string) => form.elements.namedItem(n) as unknown as T;
  const radio = (n: string) => (form.elements.namedItem(n) as RadioNodeList).value;

  const show = (i: number, focus = true) => {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach((s, k) => s.classList.toggle('is-current', k === cur));
    dots.forEach((d, k) => d.classList.toggle('on', k <= cur));
    back.hidden = cur === 0; form.classList.toggle('last', cur === steps.length - 1); err.hidden = true;
    if (focus) steps[cur].querySelector<HTMLElement>('input:checked, input, select')?.focus({ preventScroll: true });
  };

  // destination chips follow the chosen goal (citizenship / residency); "open to advice" is always there
  const syncDestinations = () => {
    const g = radio('goal');
    form.querySelectorAll<HTMLElement>('.opt[data-type]').forEach((o) => { o.hidden = (g === 'citizenship' || g === 'residency') && o.dataset.type !== g; });
    const chosen = form.querySelector<HTMLInputElement>('input[name="destination"]:checked');
    if (chosen && chosen.closest<HTMLElement>('.opt')?.hidden) (form.querySelector('input[name="destination"][value=""]') as HTMLInputElement).checked = true;
  };

  const setError = (el: HTMLInputElement | HTMLSelectElement, text: string) => {
    el.setAttribute('aria-invalid', text ? 'true' : 'false');
    let s = el.parentElement!.querySelector('small'); if (!s && text) { s = document.createElement('small'); el.parentElement!.append(s); }
    if (s) s.textContent = text;
  };
  const validate = (i: number) => {
    const step = steps[i]; let ok = true; let first: HTMLElement | null = null;
    const names = new Set(Array.from(step.querySelectorAll<HTMLInputElement>('input[type=radio][required]')).map((r) => r.name));
    names.forEach((n) => { if (!radio(n)) { ok = false; err.textContent = msg.required ?? ''; err.hidden = false; } });
    step.querySelectorAll<HTMLInputElement | HTMLSelectElement>('.field input, .field select').forEach((el) => {
      const v = el.value.trim(); let m = '';
      if (el.required && !v) m = msg.required ?? '';
      else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) m = msg.badEmail ?? '';
      else if (el.type === 'tel' && v.replace(/[^\d]/g, '').length < 8) m = msg.badPhone ?? '';
      setError(el, m); if (m) { ok = false; first ??= el; }
    });
    first?.focus(); return ok;
  };

  next.addEventListener('click', () => { if (validate(cur)) show(cur + 1); });
  back.addEventListener('click', () => show(cur - 1));
  form.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name === 'goal') syncDestinations();
    if (t.name === 'meetsMinimum') note.hidden = t.value !== 'no';
    if (t.name === 'nationality') {                                  // suggest the branch closest to that nationality
      const opt = (t as unknown as HTMLSelectElement).selectedOptions[0]; const b = opt?.dataset.branch; const sel = field<HTMLSelectElement>('branch');
      if (b && !sel.dataset.touched) { sel.value = b; hint.textContent = `· ${msg.suggested}`; hint.hidden = false; }
    }
    if (t.name === 'branch') { (t as HTMLElement).dataset.touched = '1'; hint.hidden = true; }
    if (t.closest('.field')) setError(t, '');
    err.hidden = true;
  });
  // radio steps move on by themselves: one tap, next question
  form.addEventListener('click', (e) => {
    const r = (e.target as HTMLElement).closest<HTMLInputElement>('input[type=radio]');
    if (r && (r.name === 'goal' || (r.name === 'meetsMinimum' && r.value === 'yes')) && steps[cur].contains(r)) window.setTimeout(() => show(cur + 1), 260);
  });

  // arrivals from the map / passport / picker
  const receive = (slug: string) => {
    const r = form.querySelector<HTMLInputElement>(`input[name="destination"][value="${CSS.escape(slug)}"]`); if (!r) return;
    const type = r.closest<HTMLElement>('.opt')?.dataset.type;
    if (!radio('goal') && type) { (form.querySelector(`input[name="goal"][value="${type}"]`) as HTMLInputElement).checked = true; }
    syncDestinations(); r.checked = true; r.closest<HTMLElement>('.opt')!.hidden = false;
    show(radio('meetsMinimum') ? 3 : 2, false);
  };
  window.addEventListener('reach:destination', (e) => receive((e as CustomEvent<string>).detail));
  const pending = (window as any).__reachDestination as string | undefined;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    for (let i = 0; i < steps.length; i++) if (!validate(i)) { show(i, false); validate(i); return; }
    const d = new FormData(form); const label = send.textContent; send.disabled = true; send.textContent = msg.sending ?? '…';
    const lead = { firstName: d.get('firstName'), lastName: d.get('lastName'), mobile: d.get('mobile'), email: d.get('email'), nationality: d.get('nationality'), branch: d.get('branch'),
      goal: d.get('goal'), destination: d.get('destination'), meetsMinimum: d.get('meetsMinimum') === 'yes', newsletter: d.get('newsletter') === 'on', company: d.get('company'), language: form.dataset.lang, page: location.pathname };
    try {
      const preview = (window as any).__PREVIEW === true;            // set only by the single-file design preview, never on the real site
      const ok = preview ? true : (await fetch(import.meta.env.PUBLIC_LEAD_ENDPOINT ?? '/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(lead) })).ok;
      if (!ok) throw new Error('rejected');
      form.classList.add('sent'); done.hidden = false; done.focus();
    } catch { err.textContent = msg.error ?? ''; err.hidden = false; send.disabled = false; send.textContent = label; }
  });

  show(0, false); syncDestinations(); if (pending) receive(pending);
}
