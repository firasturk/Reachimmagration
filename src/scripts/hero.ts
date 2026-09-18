// Hero timeline — ported from the approved preview. Numbers are the prototype's AFTER_TIMEOUT values, shifted +4.5 s
// after scene 1 because the passport clip plays at its natural 8 s. Do not tune these by eye.
const VIDEO_AT = 2.0;
const T = { s1Out: 7.75, s2In: 10, still2: 10.1, s2Out: 13.75, s3In: 15.5, posCentre: 4.3 };

export function initHero() {
  const hero = document.getElementById('hero'); if (!hero) return;
  const stage = document.getElementById('stage')!, mstage = document.getElementById('mstage')!;
  const bgwrap = document.getElementById('bgwrap')!, mSlot = document.getElementById('mBgSlot')!;
  const v = document.getElementById('bgv') as HTMLVideoElement;
  const root = document.documentElement;
  let mode: 'm' | 'd' | null = null, started = false, timers: number[] = [];
  v.addEventListener('canplay', () => v.classList.add('ready'));

  // Figma "Slow" spring (mass 1, stiffness 80, damping 20) sampled into a linear() easing — shared by every section
  try {
    if (CSS.supports('transition-timing-function', 'linear(0, 1)')) {
      const k = 80, c = 20, D = 1.25, N = 32, w0 = Math.sqrt(k), z = c / (2 * Math.sqrt(k)), q = Math.sqrt(z * z - 1);
      const r1 = -w0 * (z - q), r2 = -w0 * (z + q), A = r2 / (r2 - r1), B = 1 - A;
      const f = (t: number) => 1 - (A * Math.exp(r1 * t) + B * Math.exp(r2 * t)), end = f(D);
      root.style.setProperty('--spring', `linear(${Array.from({ length: N + 1 }, (_, i) => (f((D * i) / N) / end).toFixed(4)).join(',')})`);
    }
  } catch { /* keeps the cubic-bezier fallback */ }

  // videos load only for the stage that is showing; the design preview can inject sources through window.__V
  const armVideos = () => {
    const V = (window as any).__V as Record<string, string> | undefined;
    hero.querySelectorAll<HTMLVideoElement>('video[data-v]').forEach((el) => {
      const on = el === v || (mode === 'm' ? mstage : stage).contains(el);
      if (on) {
        if (!el.getAttribute('src')) el.src = V?.[el.dataset.v!] ?? el.dataset.src!;
        if (el !== v) el.play().catch(() => {});
      } else { el.pause(); if (el.getAttribute('src')) { el.removeAttribute('src'); el.load(); } }
    });
  };
  const setPos = (p: string) => bgwrap.style.setProperty('--pos', p);
  const vseek = (t: number, play: boolean) => { try { v.pause(); v.currentTime = t; if (play) v.play().catch(() => {}); } catch { /* not ready yet */ } };
  const state = (id: string, s: 'pre' | 'in' | 'out') => { for (const el of [document.getElementById(id), document.getElementById('m-' + id)]) if (el) el.dataset.state = s; };
  const still = (n: number) => bgwrap.querySelectorAll<HTMLElement>('.bgl').forEach((b) => b.classList.toggle('on', Number(b.dataset.bg) <= n));
  const at = (sec: number, fn: () => void) => timers.push(window.setTimeout(fn, sec * 1000));

  const mBtn = document.getElementById('mMenuBtn'), mMenu = document.getElementById('mMenu');
  const closeMenu = () => { if (mBtn && mMenu) { mBtn.setAttribute('aria-expanded', 'false'); mMenu.hidden = true; } };
  mBtn?.addEventListener('click', () => { const open = mBtn.getAttribute('aria-expanded') === 'true'; mBtn.setAttribute('aria-expanded', String(!open)); mMenu!.hidden = open; });
  mMenu?.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) closeMenu(); });

  const playAll = () => {
    timers.forEach(clearTimeout); timers = [];
    state('nav', 'pre'); ['s1', 's2', 's3'].forEach((s) => state(s, 'pre')); void stage.offsetWidth;
    still(1); vseek(0, false); setPos('70% 50%'); closeMenu();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      state('nav', 'in'); state('s1', 'in');
      at(VIDEO_AT, () => vseek(0, true));
      at(T.posCentre, () => setPos('50% 50%'));        // mobile crop follows the passport from the right of the frame to the centre
      at(T.s1Out, () => state('s1', 'out'));
      at(T.s2In, () => state('s2', 'in'));
      at(T.still2, () => still(2));
      at(T.s2Out, () => state('s2', 'out'));
      at(T.s3In, () => { still(3); state('s3', 'in'); });
    }));
  };

  // two layouts, one timeline: under 600 px of hero width the 390×780 stage takes over and the background moves into it
  const fit = () => {
    const W = hero.clientWidth; if (!W) return; const m = W < 600 ? 'm' : 'd';
    stage.style.setProperty('--s', String(W / 1440)); mstage.style.setProperty('--ms', String(W / 390));
    if (m !== mode) {
      mode = m; hero.dataset.mode = m;
      if (m === 'm') mSlot.appendChild(bgwrap); else stage.insertBefore(bgwrap, stage.firstChild);
      armVideos(); if (started) playAll();
    }
  };
  new ResizeObserver(fit).observe(hero); fit();

  initTrail(hero);
  const start = () => { if (started) return; started = true; playAll(); };
  document.fonts?.ready.then(start); window.setTimeout(start, 1500);
}

// Cursor pattern — Reach's rosettes are born at the pointer, turn in place like gears and fade. Desktop stage + mouse only.
function initTrail(hero: HTMLElement) {
  const trail = document.getElementById('trail'); if (!trail || !trail.animate) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const MOTIFS = 8, STEP = 34, MAX = 32, NS = 'http://www.w3.org/2000/svg';
  let lastX: number | null = null, lastY = 0, turn = 1, pick = 0;
  const spawn = (x: number, y: number) => {
    if (trail.childElementCount >= MAX) return;
    const k = pick % MOTIFS; pick += 1 + Math.floor(Math.random() * 3);
    const r = Math.random(), size = r < 0.5 ? 10 + Math.random() * 7 : r < 0.85 ? 18 + Math.random() * 9 : 28 + Math.random() * 10;
    const dur = 750 + Math.random() * 350, spin = (90 + Math.random() * 80) * turn, a0 = Math.random() * 360; turn = -turn;
    const o = document.createElement('div'); o.className = 'rm'; o.style.left = `${x + (Math.random() - 0.5) * 20}px`; o.style.top = `${y + (Math.random() - 0.5) * 20}px`;
    const i = document.createElement('div'); i.className = 'rm-i';
    const s = document.createElementNS(NS, 'svg'); s.setAttribute('width', String(size)); s.setAttribute('height', String(size)); s.style.marginLeft = s.style.marginTop = `${-size / 2}px`;
    const u = document.createElementNS(NS, 'use'); u.setAttribute('href', `#rm${k}`); s.appendChild(u); i.appendChild(s); o.appendChild(i); trail.appendChild(o);
    o.animate([{ transform: `rotate(${a0}deg)` }, { transform: `rotate(${a0 + spin}deg)` }], { duration: dur, easing: 'linear', fill: 'forwards' });
    i.animate([
      { transform: 'scale(0)', opacity: 0, offset: 0, easing: 'cubic-bezier(.2,.9,.25,1.25)' },
      { transform: 'scale(1)', opacity: 1, offset: 0.16 },
      { transform: 'scale(1)', opacity: 0.95, offset: 0.4, easing: 'ease-in' },
      { transform: 'scale(.82)', opacity: 0, offset: 1 },
    ], { duration: dur, fill: 'forwards' }).onfinish = () => o.remove();
  };
  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || hero.dataset.mode === 'm') return;
    const b = hero.getBoundingClientRect(), s = b.width / 1440; if (!s) return;
    const x = (e.clientX - b.left) / s, y = (e.clientY - b.top) / s;
    if (lastX === null || (x - lastX) ** 2 + (y - lastY) ** 2 >= STEP * STEP) { lastX = x; lastY = y; spawn(x, y); }
  });
  hero.addEventListener('pointerleave', () => { lastX = null; });
}
