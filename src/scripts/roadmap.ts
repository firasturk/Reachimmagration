// Road map: the line draws with scroll progress, each milestone lights when the line reaches it, a marker rides the tip.
export function initRoadmap() {
  const sec = document.getElementById('roadmap'); const rm = sec?.querySelector<HTMLElement>('.road'); if (!sec || !rm) return;
  const nodes = Array.from(rm.querySelectorAll<HTMLElement>('.road-node')); const n = nodes.length;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; const mobile = matchMedia('(max-width: 819px)');
  const rtl = document.documentElement.dir === 'rtl';

  const layout = () => {
    const svg = rm.querySelector<SVGSVGElement>(mobile.matches ? '.road-mob' : '.road-desk')!; const line = svg.querySelector<SVGPathElement>('.road-line')!;
    const vb = svg.viewBox.baseVal; const L = line.getTotalLength();
    nodes.forEach((node, i) => {
      const f = n === 1 ? 0 : i / (n - 1); const pt = line.getPointAtLength(f * L);
      const x = (pt.x / vb.width) * 100, y = (pt.y / vb.height) * 100;
      node.style.setProperty('--x', `${x}%`); node.style.setProperty('--y', `${y}%`); node.style.setProperty('--f', String(f));
      node.classList.toggle('below', !mobile.matches && pt.y > vb.height / 2);
      node.classList.toggle('side-b', mobile.matches && pt.x > vb.width / 2);
    });
    return { line, svg, L };
  };
  let cur = layout();
  const marker = () => rm.querySelector<SVGCircleElement>(mobile.matches ? '.road-mob .road-marker' : '.road-desk .road-marker')!;

  let progress = -1;
  const setProgress = (p: number) => {
    p = Math.max(0, Math.min(1, p)); if (p === progress) return; progress = p;
    rm.style.setProperty('--p', String(p));
    const pt = cur.line.getPointAtLength(p * cur.L); const m = marker(); m.setAttribute('cx', String(pt.x)); m.setAttribute('cy', String(pt.y));
    nodes.forEach((node) => node.classList.toggle('on', p + 0.02 >= Number(node.style.getPropertyValue('--f'))));
  };
  if (reduce) { setProgress(1); return; }

  const update = () => {
    const r = rm.getBoundingClientRect(); const vh = window.innerHeight;
    const start = vh * 0.85, end = vh * 0.25 - r.height;                     // line completes when the road is ~3/4 through the viewport
    setProgress((start - r.top) / (start - end));
  };
  let raf = 0; const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); };
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', () => { cur = layout(); progress = -1; update(); });
  mobile.addEventListener('change', () => { cur = layout(); progress = -1; update(); });
  update();
  void rtl;
}
