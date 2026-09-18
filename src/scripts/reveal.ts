// Scroll reveal in the hero's language.
//  · [data-split] paragraphs are cut into their real lines; each line sits in a mask and rises, one after the other
//  · .rv blocks get .in once they are well inside the viewport; CSS does the rest with the hero's spring
// Text stays in the DOM as written (SEO, no-JS); the split copy is aria-hidden and a screen-reader copy is kept.
const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));

function split(el: HTMLElement) {
  const text = (el.dataset.text ??= (el.textContent ?? '').replace(/\s+/g, ' ').trim());
  if (!text) return;
  el.innerHTML = text.split(' ').map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
  const lines: string[][] = []; let top: number | null = null;
  el.querySelectorAll<HTMLElement>('.w').forEach((w) => {
    if (top === null || Math.abs(w.offsetTop - top) > 3) { lines.push([]); top = w.offsetTop; }
    lines[lines.length - 1].push(w.textContent ?? '');
  });
  el.innerHTML = `<span class="sr-only">${esc(text)}</span>` + lines.map((l, i) => `<span class="mask" aria-hidden="true"><span style="--li:${i}">${esc(l.join(' '))}</span></span>`).join('');
  el.classList.add('split-done');
}

export function initReveal() {
  const blocks = Array.from(document.querySelectorAll<HTMLElement>('.rv, [data-split]:not(.rv [data-split])'));
  const splits = Array.from(document.querySelectorAll<HTMLElement>('[data-split]'));
  const run = () => splits.forEach(split);
  const start = () => {
    run();
    if (!('IntersectionObserver' in window)) { blocks.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }, { threshold: 0.2, rootMargin: '0px 0px -14% 0px' });     // wait until the block is properly on screen, so the move is seen
    blocks.forEach((e) => io.observe(e));
  };
  (document.fonts?.ready ?? Promise.resolve()).then(start);     // line breaks are only right once the fonts are in

  let w = window.innerWidth, t = 0;
  window.addEventListener('resize', () => { if (window.innerWidth === w) return; w = window.innerWidth; clearTimeout(t); t = window.setTimeout(run, 180); });
}
