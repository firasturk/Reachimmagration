// Smart Map: an orthographic globe drawn on canvas with d3-geo. The country carousel is the control surface;
// the globe follows it (and the other way round when a pin is tapped). Nothing here is needed for the page to be usable.
import { geoOrthographic, geoPath, geoGraticule10, geoDistance, geoInterpolate } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

interface P { slug: string; iso: string; name: string; lat: number; lng: number; type: string }

export function initMap() {
  const canvas = document.getElementById('globe') as HTMLCanvasElement | null; const car = document.getElementById('countryCar');
  const dataEl = document.getElementById('programsData'); if (!canvas || !car || !dataEl) return;
  const programs: P[] = JSON.parse(dataEl.textContent || '[]');
  const track = car.querySelector<HTMLElement>('.car-track')!; const cards = Array.from(track.querySelectorAll<HTMLElement>('.ccard'));
  const section = document.getElementById('smart-map')!; const chips = Array.from(section.querySelectorAll<HTMLButtonElement>('.chip'));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d')!;
  const cssVar = (n: string, fb: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || fb;
  const C = {                                     // globe palette, read from the site's tokens so it can never drift
    active: cssVar('--wine-900', '#3a1a26'), on: cssVar('--wine-400', '#94526a'), off: cssVar('--wine-100', '#eee0e4'),
    land: cssVar('--slate-100', '#dfe6ee'), sea2: cssVar('--mist', '#eef2f7'), line: cssVar('--slate-300', '#90a8c0'),
    pin: cssVar('--gold', '#c0a271'), pinOff: cssVar('--slate-300', '#90a8c0'), ink: cssVar('--wine-900', '#3a1a26'),
  };
  const countries = (feature(world as any, (world as any).objects.countries) as any).features as any[];
  const isoSet = new Map(programs.map((p) => [p.iso, p]));
  const graticule = geoGraticule10();
  const projection = geoOrthographic().clipAngle(90).precision(0.5);
  const path = geoPath(projection, ctx);

  let size = 0, dpr = 1, rot: [number, number] = [20, -18], active: P | null = null, filter = 'all';
  let anim: { from: [number, number]; to: [number, number]; t0: number; dur: number } | null = null;
  let dragging = false, lastX = 0, lastY = 0, moved = 0, idleAt = 0, inView = false, raf = 0, lastDraw = 0;

  const resize = () => {
    const w = canvas.clientWidth; if (!w) return; dpr = Math.min(window.devicePixelRatio || 1, 2); size = w;
    canvas.width = canvas.height = Math.round(w * dpr); projection.scale(w * 0.46).translate([w / 2, w / 2]);
  };
  const visible = (p: P) => geoDistance([p.lng, p.lat], [-rot[0], -rot[1]]) < Math.PI / 2 - 0.05;
  const dim = (p: P) => filter !== 'all' && p.type !== filter;

  const draw = (now: number) => {
    const r = projection.scale(), c = size / 2; projection.rotate([rot[0], rot[1], 0]);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, size, size);
    const g = ctx.createRadialGradient(c - r * 0.35, c - r * 0.4, r * 0.1, c, c, r);
    g.addColorStop(0, '#ffffff'); g.addColorStop(1, C.sea2);
    ctx.beginPath(); ctx.arc(c, c, r, 0, 2 * Math.PI); ctx.fillStyle = g; ctx.shadowColor = 'rgba(58,68,78,.26)'; ctx.shadowBlur = 54; ctx.shadowOffsetY = 28; ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    ctx.beginPath(); path(graticule); ctx.strokeStyle = C.line; ctx.globalAlpha = 0.16; ctx.lineWidth = 0.6; ctx.stroke(); ctx.globalAlpha = 1;
    for (const f of countries) {
      const p = isoSet.get(String(f.id).padStart(3, '0'));
      ctx.beginPath(); path(f);
      ctx.fillStyle = p ? (p === active ? C.active : dim(p) ? C.off : C.on) : C.land; ctx.fill();
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = p === active ? 1.1 : 0.5; ctx.stroke();
    }
    for (const p of programs) {                                       // pins: the islands are too small to exist as shapes
      if (!visible(p)) continue; const xy = projection([p.lng, p.lat]); if (!xy) continue;
      const on = p === active, off = dim(p);
      if (on && !reduce) { const k = (now / 1600) % 1; ctx.beginPath(); ctx.arc(xy[0], xy[1], 7 + k * 20, 0, 2 * Math.PI); ctx.strokeStyle = C.active; ctx.globalAlpha = 0.4 * (1 - k); ctx.lineWidth = 1.6; ctx.stroke(); ctx.globalAlpha = 1; }
      ctx.beginPath(); ctx.arc(xy[0], xy[1], on ? 7 : 4.2, 0, 2 * Math.PI); ctx.fillStyle = off ? C.pinOff : on ? C.pin : C.on; ctx.fill();
      ctx.lineWidth = on ? 2.5 : 1.6; ctx.strokeStyle = '#fff'; ctx.stroke();
      if (on) {
        ctx.font = `500 13px ${getComputedStyle(document.body).fontFamily}`; const w = ctx.measureText(p.name).width + 20;
        const bx = Math.min(size - w - 6, Math.max(6, xy[0] - w / 2)), by = xy[1] - 42;
        ctx.beginPath(); (ctx as any).roundRect ? (ctx as any).roundRect(bx, by, w, 26, 13) : ctx.rect(bx, by, w, 26); ctx.fillStyle = C.ink; ctx.fill();
        ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(p.name, bx + w / 2, by + 13.5);
      }
    }
  };

  const ease = (t: number) => 1 - Math.pow(1 - t, 4);
  const frame = (now: number) => {
    raf = 0; if (!inView) return;
    if (anim) {
      const t = Math.min(1, (now - anim.t0) / anim.dur); const k = ease(t);
      const ip = geoInterpolate([-anim.from[0], -anim.from[1]], [-anim.to[0], -anim.to[1]])(k); rot = [-ip[0], -ip[1]];
      if (t === 1) { anim = null; idleAt = now; }
    } else if (!dragging && !reduce && !active && now - idleAt > 1200) rot = [rot[0] + 0.05, rot[1]];
    if (now - lastDraw > 22) { draw(now); lastDraw = now; } ringTick(now);
    raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && inView) raf = requestAnimationFrame(frame); };
  const rotateTo = (p: P) => { anim = { from: rot, to: [-p.lng, -Math.max(-42, Math.min(42, p.lat * 0.85))], t0: performance.now(), dur: reduce ? 1 : 1500 }; kick(); };

  // carousel
  const shown = () => cards.filter((c) => !c.hidden);
  const centre = (card: HTMLElement, smooth = true) => {
    const tr = track.getBoundingClientRect(), cr = card.getBoundingClientRect();
    track.scrollBy({ left: cr.left + cr.width / 2 - (tr.left + tr.width / 2), behavior: smooth && !reduce ? 'smooth' : 'auto' });
  };
  let lockUntil = 0;
  const select = (slug: string | null, opts: { scroll?: boolean; spin?: boolean } = {}) => {
    active = programs.find((p) => p.slug === slug) ?? null;
    cards.forEach((c) => { const on = c.dataset.slug === slug; c.classList.toggle('is-active', on); c.querySelector('.ccard-hit')?.setAttribute('aria-pressed', String(on)); });
    const order = shown(); const ai = order.findIndex((c) => c.dataset.slug === slug);
    cards.forEach((c) => c.classList.toggle('is-next', ai >= 0 && c === order[(ai + 1) % order.length]));
    const card = cards.find((c) => c.dataset.slug === slug);
    if (card && opts.scroll !== false) { lockUntil = performance.now() + 900; centre(card); }
    if (active && opts.spin !== false) rotateTo(active); else kick();
    queue();
  };
  const tilt = () => {
    const tr = track.getBoundingClientRect(), mid = tr.left + tr.width / 2;
    for (const c of shown()) { const r = c.getBoundingClientRect(); const o = (r.left + r.width / 2 - mid) / r.width; c.style.setProperty('--ry', String(Math.max(-26, Math.min(26, -o * 16)))); c.style.setProperty('--sc', String(1 - Math.min(Math.abs(o), 1.2) * 0.07)); }
  };
  // AUTOPLAY — the carousel turns by itself, like the hero plays by itself. Any touch, click, drag, wheel or key stops it
  // for good (the visitor is steering now); hovering pauses it, and it sleeps while off-screen or the tab is hidden.
  const DWELL = 4200;
  let auto = !reduce, autoT = 0, ringFrom = 0;
  const hint = section.querySelector<HTMLElement>('.globe-hint');
  const ringTick = (now: number) => hint?.style.setProperty('--p', auto && inView ? String(Math.min(1, (now - ringFrom) / DWELL)) : '0');
  const queue = () => {
    clearTimeout(autoT); if (!auto || !inView) return;
    ringFrom = performance.now();
    autoT = window.setTimeout(() => {
      const list = shown(); const i = list.findIndex((c) => c.dataset.slug === active?.slug);
      const n = list[(i + 1) % list.length]; if (n) select(n.dataset.slug!);
    }, DWELL);
  };
  const stopAuto = () => { auto = false; clearTimeout(autoT); car.classList.add('paused'); hint?.style.setProperty('--p', '0'); };
  ['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach((ev) => car.addEventListener(ev, stopAuto, { passive: true }));
  canvas.addEventListener('pointerdown', stopAuto);
  car.addEventListener('pointerenter', () => { clearTimeout(autoT); hint?.style.setProperty('--p', '0'); });
  car.addEventListener('pointerleave', () => queue());
  document.addEventListener('visibilitychange', () => (document.hidden ? clearTimeout(autoT) : queue()));

  let settle = 0;
  track.addEventListener('scroll', () => {
    if (!reduce) requestAnimationFrame(tilt);
    clearTimeout(settle); settle = window.setTimeout(() => {                 // swiping the cards drives the globe
      if (performance.now() < lockUntil) return;
      const tr = track.getBoundingClientRect(), mid = tr.left + tr.width / 2; let best: HTMLElement | null = null, bd = 1e9;
      for (const c of shown()) { const r = c.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = c; } }
      if (best && best.dataset.slug !== active?.slug) select(best.dataset.slug!, { scroll: false });
    }, 140);
  }, { passive: true });
  track.addEventListener('click', (e) => { const hit = (e.target as HTMLElement).closest('.ccard-hit'); if (hit) select(hit.closest<HTMLElement>('.ccard')!.dataset.slug!); });
  car.querySelectorAll<HTMLButtonElement>('.car-btn').forEach((b) => b.addEventListener('click', () => {
    const list = shown(); const i = list.findIndex((c) => c.dataset.slug === active?.slug); const n = list[(i + Number(b.dataset.dir) + list.length) % list.length]; if (n) select(n.dataset.slug!);
  }));
  chips.forEach((chip) => chip.addEventListener('click', () => {
    filter = chip.dataset.filter ?? 'all'; chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    cards.forEach((c) => { c.hidden = filter !== 'all' && c.dataset.type !== filter; });
    const list = shown(); if (!list.some((c) => c.dataset.slug === active?.slug) && list[0]) select(list[0].dataset.slug!); else { const a = cards.find((c) => c.classList.contains('is-active')); if (a) centre(a, false); kick(); }
    tilt();
  }));

  // globe: drag to spin (horizontal on touch, so the page still scrolls), tap a pin to pick it
  canvas.addEventListener('pointerdown', (e) => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; anim = null; canvas.setPointerCapture(e.pointerId); canvas.classList.add('dragging'); kick(); });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return; const dx = e.clientX - lastX, dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
    const k = 0.32 * (320 / Math.max(200, size)) + 0.1; rot = [rot[0] + dx * k, Math.max(-60, Math.min(60, rot[1] - dy * k))];
  });
  const up = (e: PointerEvent) => {
    if (!dragging) return; dragging = false; canvas.classList.remove('dragging'); idleAt = performance.now();
    if (moved < 6) {
      const b = canvas.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top; let best: P | null = null, bd = 22;
      projection.rotate([rot[0], rot[1], 0]);
      for (const p of programs) { if (!visible(p) || dim(p)) continue; const xy = projection([p.lng, p.lat]); if (!xy) continue; const d = Math.hypot(xy[0] - x, xy[1] - y); if (d < bd) { bd = d; best = p; } }
      if (best) select(best.slug);
    }
  };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', () => { dragging = false; canvas.classList.remove('dragging'); });

  new ResizeObserver(() => { resize(); tilt(); kick(); }).observe(canvas);
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) { kick(); queue(); } else clearTimeout(autoT); }, { rootMargin: '120px 0px' }).observe(section);
  resize(); tilt();
  // open on the Caribbean: it is where most of the licensed programs are
  const first = cards.find((c) => c.dataset.slug === 'saint-lucia') ?? cards[0];
  if (first) { centre(first, false); select(first.dataset.slug!, { scroll: false }); requestAnimationFrame(tilt); }
}
