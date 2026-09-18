// Glue between sections: whatever country the visitor touches (map card, passport page, hero picker) travels to the form.
export function sendDestination(slug: string) {
  (window as any).__reachDestination = slug;                       // kept for the form if it has not loaded yet
  window.dispatchEvent(new CustomEvent('reach:destination', { detail: slug }));
}

export function initBridge() {
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLElement>('[data-assess]');
    if (a?.dataset.assess) sendDestination(a.dataset.assess);
  });

  const dlg = document.getElementById('picker') as HTMLDialogElement | null; if (!dlg) return;
  const grid = document.getElementById('pkGrid')!, go = document.getElementById('pkGo') as HTMLButtonElement, pick = document.getElementById('pkPick')!;
  let chosen = '';
  const open = (e: Event) => { e.preventDefault(); if (!dlg.open) dlg.showModal(); };
  document.querySelectorAll<HTMLElement>('[data-picker]').forEach((el) => {
    el.addEventListener('click', open);
    el.addEventListener('keydown', (e) => { if (el.tagName !== 'A' && (e.key === 'Enter' || e.key === ' ')) open(e); });
  });
  grid.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.pk-chip'); if (!b) return;
    grid.querySelectorAll('.pk-chip').forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    chosen = b.dataset.slug ?? ''; pick.textContent = `${pick.dataset.selected} ${b.dataset.name}`; go.disabled = false;
  });
  go.addEventListener('click', () => {
    if (!chosen) return;
    sendDestination(chosen); dlg.close();
    document.getElementById('consult')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  document.getElementById('pkClose')?.addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
}
