// Branch map (contact page). Mercator view of the Middle East, North Africa and the eastern Mediterranean drawn as SVG,
// routes from Amman animated in when the map is on screen, pins and cards linked on hover.
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

interface Pin { id: string; lat: number; lng: number; country: string; name: string; city: string }
const OFFICE_ISO = new Set(['400', '368', '818', '682', '634', '784', '414', '792', '196']);   // JO IQ EG SA QA AE KW TR CY
const SVG = 'http://www.w3.org/2000/svg';

export function initBranches() {
  const root = document.getElementById('branchMap'); const svg = root?.querySelector<SVGSVGElement>('.bm-svg'); const dataEl = document.getElementById('branchPins');
  if (!root || !svg || !dataEl) return;
  const pins: Pin[] = JSON.parse(dataEl.textContent || '[]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = 1000, H = 600;
  const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}, parent?: Element) => {
    const e = document.createElementNS(SVG, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v)); parent?.append(e); return e;
  };

  const projection = geoMercator().fitExtent([[24, 24], [W - 24, H - 24]], { type: 'Polygon', coordinates: [[[23, 19], [23, 43.5], [60, 43.5], [60, 19], [23, 19]]] /* clockwise: d3 reads the other winding as the rest of the sphere */ } as any);
  const path = geoPath(projection);
  const countries = (feature(world as any, (world as any).objects.countries) as any).features as any[];

  const gLand = el('g', { class: 'bm-land' }, svg);
  for (const f of countries) {
    const [[x0, y0], [x1, y1]] = path.bounds(f); if (x1 < 0 || y1 < 0 || x0 > W || y0 > H) continue;   // off the map: skip the path entirely
    const d = path(f); if (!d) continue;
    el('path', { d, class: OFFICE_ISO.has(String(f.id).padStart(3, '0')) ? 'bm-c on' : 'bm-c' }, gLand);
  }

  // group pins that share a spot (the four Cairo offices)
  const groups = new Map<string, Pin[]>();
  for (const p of pins) { const k = `${p.lat},${p.lng}`; groups.set(k, [...(groups.get(k) ?? []), p]); }
  const hq = pins[0]; const hqXY = projection([hq.lng, hq.lat])!;
  const gRoutes = el('g', { class: 'bm-routes' }, svg); const gPins = el('g', { class: 'bm-pins' }, svg);

  let i = 0;
  for (const [, list] of groups) {
    const p = list[0]; const xy = projection([p.lng, p.lat])!; const isHq = p.id === hq.id;
    const ids = list.map((x) => x.id).join(',');
    if (!isHq) {                                                     // route from Amman, lifted so it reads as a flight line
      const mx = (hqXY[0] + xy[0]) / 2, my = (hqXY[1] + xy[1]) / 2, dx = xy[0] - hqXY[0], dy = xy[1] - hqXY[1];
      const len = Math.hypot(dx, dy) || 1, lift = Math.min(90, len * 0.28);
      const cx = mx - (dy / len) * lift, cy = my + (dx / len) * lift;
      const d = `M${hqXY[0]},${hqXY[1]} Q${cx},${cy} ${xy[0]},${xy[1]}`;
      const route = el('path', { d, class: 'bm-route', pathLength: 1, id: `bmRoute${i}`, style: `--i:${i}` }, gRoutes);
      route.dataset.ids = ids;
      if (!reduce) {
        const dot = el('circle', { r: 3.2, class: 'bm-dot', style: `--i:${i}` }, gRoutes);
        const mo = el('animateMotion', { dur: `${2.6 + (i % 4) * 0.5}s`, repeatCount: 'indefinite', begin: `${1.2 + i * 0.12}s` }, dot);
        el('mpath', { href: `#bmRoute${i}` }, mo);
      }
    }
    const g = el('g', { class: isHq ? 'bm-pin hq' : 'bm-pin', transform: `translate(${xy[0]},${xy[1]})`, style: `--i:${i}`, tabindex: 0, role: 'button' }, gPins);
    (g as unknown as HTMLElement).dataset.ids = ids;
    el('circle', { r: isHq ? 14 : 10, class: 'bm-pulse' }, g);
    el('circle', { r: isHq ? 7 : 5, class: 'bm-core' }, g);
    const east = p.lng > 49 || p.lng < 27;                             // Gulf and Istanbul labels sit on the inner side
    const label = el('text', { x: east ? -12 : 12, y: 5, class: 'bm-label', 'text-anchor': east ? 'end' : 'start' }, g);
    label.textContent = list.length > 1 ? `${p.city} ×${list.length}` : p.city;
    if (isHq) { const t = el('text', { x: 12, y: 24, class: 'bm-label hqtag' }, g); t.textContent = root.dataset.lang === 'ar' ? 'المقر الرئيسي' : 'Head office'; }
    i++;
  }

  // hover / focus links pins and cards both ways
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.branch[data-id]'));
  const set = (ids: string[], on: boolean) => {
    for (const c of cards) if (ids.includes(c.dataset.id!)) c.classList.toggle('hi', on);
    svg.querySelectorAll<SVGGElement>('.bm-pin, .bm-route').forEach((n) => { const mine = (n.dataset.ids ?? '').split(','); if (mine.some((x) => ids.includes(x))) n.classList.toggle('hi', on); });
  };
  svg.querySelectorAll<SVGGElement>('.bm-pin').forEach((pin) => {
    const ids = (pin.dataset.ids ?? '').split(',');
    pin.addEventListener('pointerenter', () => set(ids, true)); pin.addEventListener('pointerleave', () => set(ids, false));
    pin.addEventListener('focus', () => set(ids, true)); pin.addEventListener('blur', () => set(ids, false));
    const go = () => { const c = cards.find((x) => x.dataset.id === ids[0]); c?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); c?.classList.add('flash'); setTimeout(() => c?.classList.remove('flash'), 1600); };
    pin.addEventListener('click', go); pin.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
  for (const c of cards) { c.addEventListener('pointerenter', () => set([c.dataset.id!], true)); c.addEventListener('pointerleave', () => set([c.dataset.id!], false)); }

  // routes draw in once the map is on screen
  // routes draw in once the map is on screen; the travelling dots and pulses only run while it stays on screen
  let drawn = false;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!drawn) { drawn = true; root.classList.add('drawn'); } root.classList.remove('idle'); svg.unpauseAnimations(); }
    else { root.classList.add('idle'); svg.pauseAnimations(); }
  }, { threshold: 0.2 }).observe(root);
}
