// Passport comparison. Loaded only on the passport-index page (see main.ts). Reads the same JSON the page was built from.
import data from '../data/passport-index.json';

type P = (typeof data.passports)[number];
const OPEN = new Set(['F', 'O', 'A']);

export function initPassportIndex() {
  const tool = document.getElementById('piTool'); if (!tool) return;
  const t = tool.dataset; const lang = (t.lang === 'ar' ? 'ar' : 'en') as 'en' | 'ar'; const home = t.home ?? '/en/';
  const selA = document.getElementById('piA') as HTMLSelectElement, selB = document.getElementById('piB') as HTMLSelectElement;
  const cards = document.getElementById('piCards')!, gain = document.getElementById('piGainBody')!;
  const byCode = new Map(data.passports.map((p) => [p.c, p]));
  const programs: Record<string, string> = JSON.parse(tool.dataset.programs ?? '{}');
  const flag = (c: string) => String.fromCodePoint(...[...c].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65));
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

  const card = (p: P, label: string) => `
    <article class="pi-card">
      <p class="pi-card-label">${esc(label)}</p>
      <h3><span aria-hidden="true">${flag(p.c)}</span> ${esc(p[lang])}</h3>
      <p class="pi-big"><b>${p.score}</b> <span>${esc(t.destinations!)}</span> · <span>${esc(t.rank!)} ${p.rank}</span></p>
      <dl class="pi-break">
        <div><dt>${esc(t.vf!)}</dt><dd>${p.f}</dd></div><div><dt>${esc(t.voa!)}</dt><dd>${p.o}</dd></div><div><dt>${esc(t.eta!)}</dt><dd>${p.a}</dd></div>
        <div><dt>${esc(t.evisa!)}</dt><dd>${p.e}</dd></div><div><dt>${esc(t.required!)}</dt><dd>${p.r}</dd></div>
      </dl>
      ${programs[p.c] ? `<a class="link-arrow strong" href="${home}programs/${programs[p.c]}/">${esc(t.view!)}</a>` : ''}
    </article>`;

  const render = () => {
    const a = byCode.get(selA.value)!, b = byCode.get(selB.value)!;
    cards.innerHTML = card(a, t.yours ?? '') + card(b, t.second ?? '');
    const groups: Record<'F' | 'O' | 'A', string[]> = { F: [], O: [], A: [] };
    let union = 0;
    data.destinations.forEach((d, i) => {
      const ca = a.access[i], cb = b.access[i];
      if (OPEN.has(ca) || OPEN.has(cb)) union++;
      if (OPEN.has(cb) && !OPEN.has(ca) && ca !== 'S') groups[cb as 'F' | 'O' | 'A'].push(d[lang]);
    });
    const total = groups.F.length + groups.O.length + groups.A.length;
    const label = { F: t.newVf!, O: t.newVoa!, A: t.newEta! };
    gain.innerHTML = `<p class="pi-big pi-sum"><b>+${total}</b> <span>${esc(t.destinations!)}</span> · <span>${esc(t.combined!)} <b>${union}</b> ${esc(t.of!)} ${data.destinations.length}</span></p>` +
      (total === 0 ? `<p class="prog-updated">${esc(t.addsNone!)}</p>` :
        (['F', 'O', 'A'] as const).filter((k) => groups[k].length).map((k) => `<div class="pi-group"><h3>${esc(label[k])} <span>${groups[k].length}</span></h3><ul class="chips" role="list">${groups[k].sort((x, y) => x.localeCompare(y, lang)).map((n) => `<li class="chip">${esc(n)}</li>`).join('')}</ul></div>`).join(''));
  };
  selA.addEventListener('change', render); selB.addEventListener('change', render); render();

  // ranking table search
  const search = document.getElementById('piSearch') as HTMLInputElement | null, table = document.getElementById('piTable'), empty = document.getElementById('piEmpty');
  if (search && table && empty) {
    const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>('tbody tr'));
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase(); let n = 0;
      rows.forEach((r) => { const hit = !q || (r.dataset.name ?? '').includes(q); r.hidden = !hit; if (hit) n++; });
      empty.hidden = n > 0;
    });
  }
}
