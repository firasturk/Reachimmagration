// Section videos: nothing downloads until the video is near the screen, and it only plays while it is visible.
export function initMedia() {
  const vids = document.querySelectorAll<HTMLVideoElement>('video.lazy-v'); if (!vids.length) return;
  const V = (window as any).__V as Record<string, string> | undefined;               // design preview only
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const visible = new WeakSet<HTMLVideoElement>();
  const load = (v: HTMLVideoElement) => { if (!v.getAttribute('src')) v.src = V?.[v.dataset.v ?? ''] ?? v.dataset.src!; };
  const sync = (v: HTMLVideoElement) => { if (still) return; if (visible.has(v)) { load(v); v.play().catch(() => {}); } else v.pause(); };
  const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { load(e.target as HTMLVideoElement); near.unobserve(e.target); } }), { rootMargin: '500px 0px' });
  const seen = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target as HTMLVideoElement; if (e.isIntersecting) visible.add(v); else visible.delete(v); sync(v);
  }), { threshold: 0.1 });
  vids.forEach((v) => { near.observe(v); seen.observe(v); v.addEventListener('canplay', () => sync(v)); });
}
