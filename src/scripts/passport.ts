// Smart Passport: turns the leaves of the CSS-3D book. `turned` = how many leaves lie on the far side.
export function initPassport() {
  const book = document.getElementById('book'); if (!book) return;
  const leaves = Array.from(book.querySelectorAll<HTMLElement>('.leaf'));
  const count = leaves.length;                                       // cover + one leaf per program
  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>('.pp-chip[data-jump]'));
  const endPage = book.querySelector<HTMLElement>('.book-base.is-right');
  let turned = 0;

  const paint = (from: number) => {
    leaves.forEach((leaf, i) => {
      const should = i < turned; const changes = leaf.classList.contains('turned') !== should;
      if (changes) {
        leaf.style.transitionDelay = `${Math.min(Math.abs(i - from), 8) * 45}ms`;   // fan the pages when jumping far
        leaf.classList.add('moving'); leaf.classList.toggle('turned', should);
        window.setTimeout(() => { leaf.classList.remove('moving'); leaf.style.transitionDelay = ''; }, 1300 + Math.min(Math.abs(i - from), 8) * 45);
      }
      leaf.inert = i !== turned;                                       // only the page you can see takes focus
    });
    if (endPage) endPage.inert = turned !== count;
    book.dataset.turned = String(turned);
    chips.forEach((c) => { const on = Number(c.dataset.jump) === turned; c.classList.toggle('on', on); c.setAttribute('aria-pressed', String(on)); if (on) c.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' }); });
  };
  const go = (n: number) => { const from = turned; turned = Math.max(0, Math.min(count, n)); if (turned !== from) paint(from); };

  document.querySelectorAll<HTMLElement>('[data-book]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); go(turned + (b.dataset.book === 'next' ? 1 : -1)); }));
  leaves.forEach((leaf, i) => leaf.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a,button,select')) return;
    go(leaf.classList.contains('turned') ? i : i + 1);
  }));
  chips.forEach((c) => c.addEventListener('click', (e) => { e.stopPropagation(); go(Number(c.dataset.jump)); }));
  paint(0);
}
