// Smart Passport: turns the leaves of the CSS-3D book. `turned` = how many leaves lie on the far side.
// Stacking while pages are in the air is set here, not in CSS: a leaf turning forward must sit above the leaves that
// turn after it (lower index on top); turning back it is the other way round. Every in-flight timer is owned by its
// leaf and cancelled when a new move starts, so rapid clicks never leave a page half-turned or on the wrong layer.
export function initPassport() {
  const book = document.getElementById('book'); if (!book) return;
  const leaves = Array.from(book.querySelectorAll<HTMLElement>('.leaf'));
  const count = leaves.length;                                       // cover + one leaf per program
  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>('.pp-chip[data-jump]'));
  const strip = chips[0]?.parentElement ?? null;
  const endPage = book.querySelector<HTMLElement>('.book-base.is-right');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FLIP = reduce ? 0 : 1150, STEP = reduce ? 0 : 45;            // must match .leaf transition in global.css
  const timers = new Map<HTMLElement, number>();
  let turned = 0;

  const settle = (leaf: HTMLElement) => {                            // back to the resting stack order
    leaf.classList.remove('moving'); leaf.style.zIndex = ''; leaf.style.removeProperty('--fan'); timers.delete(leaf);
  };
  const paint = (from: number) => {
    const forward = turned > from;
    leaves.forEach((leaf, i) => {
      const should = i < turned;
      if (leaf.classList.contains('turned') !== should) {
        const k = Math.min(forward ? i - from : from - 1 - i, 8);      // position in the fan: 0 = first leaf to move
        const t = timers.get(leaf); if (t) window.clearTimeout(t);
        leaf.style.setProperty('--fan', `${k * STEP}ms`);            // fan delay as a variable: the phone's opacity fade keeps its own offset
        leaf.style.zIndex = String(300 + (forward ? count - i : i)); // in the air: above both stacks, in flight order
        leaf.classList.add('moving'); leaf.classList.toggle('turned', should);
        timers.set(leaf, window.setTimeout(() => settle(leaf), FLIP + k * STEP + 60));
      }
      leaf.inert = i !== turned;                                       // only the page you can see takes focus
    });
    if (endPage) endPage.inert = turned !== count;
    book.dataset.turned = String(turned);
    book.classList.toggle('at-end', turned === count);                  // the closing page exists only once every leaf is turned
    chips.forEach((c) => { const on = Number(c.dataset.jump) === turned; c.classList.toggle('on', on); c.setAttribute('aria-pressed', String(on)); });
    const on = chips.find((c) => Number(c.dataset.jump) === turned);
    if (on && strip) strip.scrollTo({ left: on.offsetLeft - strip.clientWidth / 2 + on.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });   // strip only, never the page
  };
  const go = (n: number) => { const from = turned; turned = Math.max(0, Math.min(count, n)); if (turned !== from) paint(from); };

  document.querySelectorAll<HTMLElement>('[data-book]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); go(turned + (b.dataset.book === 'next' ? 1 : -1)); }));
  leaves.forEach((leaf, i) => leaf.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a,button')) return;
    go(leaf.classList.contains('turned') ? i : i + 1);
  }));
  chips.forEach((c) => c.addEventListener('click', (e) => { e.stopPropagation(); go(Number(c.dataset.jump)); }));
  document.addEventListener('keydown', (e) => {                        // arrow keys while the book has focus
    if (!book.contains(document.activeElement) && !strip?.contains(document.activeElement)) return;
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'ArrowRight') go(turned + (rtl ? -1 : 1)); else if (e.key === 'ArrowLeft') go(turned + (rtl ? 1 : -1));
  });
  paint(0);
  leaves.forEach(settle);                                              // the first paint is a layout, not a flip
}
