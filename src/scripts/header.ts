// The hero has its own nav, so on the home page the site header slides in only after the hero has left the screen.
export function initHeader() {
  const header = document.querySelector<HTMLElement>('.site-header'); if (!header) return;
  const hero = document.getElementById('hero');
  if (hero && header.dataset.overHero) {
    new IntersectionObserver(([e]) => header.classList.toggle('show', !e.isIntersecting), { rootMargin: '-72px 0px 0px 0px' }).observe(hero);
  }
  const burger = header.querySelector<HTMLButtonElement>('.sh-burger'); const panel = document.getElementById('shPanel');
  if (!burger || !panel) return;
  const set = (open: boolean) => { burger.setAttribute('aria-expanded', String(open)); panel.hidden = !open; };
  burger.addEventListener('click', () => set(burger.getAttribute('aria-expanded') !== 'true'));
  panel.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) set(false); });
}
