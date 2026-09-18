// One entry for the whole site. The hero and the small helpers run at once; the globe, the passport and the form
// are loaded only when their section gets close to the viewport, so the first paint never waits for them.
import { initHero } from './hero';
import { initReveal } from './reveal';
import { initHeader } from './header';
import { initBridge } from './bridge';
import { initMedia } from './media';

initHero();
initReveal();
initHeader();
initBridge();
initMedia();

const lazy: [string, () => Promise<void>][] = [
  ['#smart-map', () => import('./map').then((m) => m.initMap())],
  ['#smart-passport', () => import('./passport').then((m) => m.initPassport())],
  ['#leadForm', () => import('./form').then((m) => m.initForm())],
  ['#piTool', () => import('./passport-index').then((m) => m.initPassportIndex())],
];
for (const [sel, load] of lazy) {
  const el = document.querySelector(sel);
  if (!el) continue;
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { io.disconnect(); load(); }
  }, { rootMargin: '900px 0px' });
  io.observe(el);
}

// programs index: filter chips, also driven by ?type=
const grid = document.getElementById('programGrid'); const filter = document.getElementById('programFilter');
if (grid && filter) {
  const apply = (type: string) => {
    filter.querySelectorAll<HTMLButtonElement>('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === type)));
    grid.querySelectorAll<HTMLElement>('li').forEach((li) => { li.hidden = type !== 'all' && li.dataset.type !== type; });
  };
  filter.addEventListener('click', (e) => { const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.chip'); if (b) apply(b.dataset.filter ?? 'all'); });
  const q = new URLSearchParams(location.search).get('type'); if (q === 'citizenship' || q === 'residency') apply(q);
}
