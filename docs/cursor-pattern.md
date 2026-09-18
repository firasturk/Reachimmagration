# Cursor pattern — current implementation & how to tune it

Hand this file to Claude Code together with the project zip. It describes **only** the hero's
cursor-pattern effect (Reach's rosette motifs that appear under the pointer) and the numbers that
control how it looks and how fast it fades. Nothing else in the project should change.

---

## 1. Where the code lives

| What | File | Where in the file |
|---|---|---|
| Behaviour (spawn, spin, fade) | `src/scripts/hero.ts` | `function initTrail(hero)` — last function in the file |
| Styling (layer, colour, blend) | `src/styles/hero.css` | the `CURSOR PATTERN` block, ~line 200 |
| The 8 motif shapes | `src/components/Hero.astro` | inline `<svg class="rm-defs">` with `<symbol id="rm0">` … `id="rm7">` |
| The container the motifs are added to | `src/components/Hero.astro` | `<div class="trail" id="trail" aria-hidden="true">` |
| Colour token | `src/styles/global.css` | `--brand-accent` (currently `#7f3450`) |

The motif shapes were extracted from the client's own brand pattern file (`reach_pattern_.svg`):
two large rosettes (`rm0`, `rm1`) and six smaller rings (`rm2` … `rm7`).

---

## 2. What it does right now

One motif is born at the pointer every **34 design px** of travel. It does **not** move from where
it was born: it pops in, **spins in place around its own centre** like a gear, then fades out.
Neighbouring motifs spin in **opposite directions** (`turn = -turn` alternates the sign).

Coordinates are in the hero's 1440×810 design space, not screen pixels — the handler divides by the
stage scale (`b.width / 1440`), so the effect behaves the same on a 1920 monitor and a 1280 laptop.

**It is intentionally disabled when:**

- `e.pointerType !== 'mouse'` — no touch, no pen
- `hero.dataset.mode === 'm'` — the mobile stage (< 600 px hero width) is showing
- `prefers-reduced-motion: reduce` is set

---

## 3. Current numbers (the whole tuning surface)

All of these are inside `initTrail` in `src/scripts/hero.ts`.

```ts
const MOTIFS = 8, STEP = 34, MAX = 32;
```

| Constant | Value | Meaning |
|---|---|---|
| `MOTIFS` | `8` | How many symbols exist (`#rm0` … `#rm7`). Don't change without adding symbols. |
| `STEP` | `34` | Distance in design px the pointer must travel before the next motif is born. **Lower = denser trail.** |
| `MAX` | `32` | Hard cap on motifs alive at once. Safety valve, not a look control. |

```ts
const r = Math.random(),
  size = r < 0.5  ? 10 + Math.random() * 7      // 50% small   → 10–17 px
       : r < 0.85 ? 18 + Math.random() * 9      // 35% medium  → 18–27 px
       :            28 + Math.random() * 10;    // 15% large   → 28–38 px
```

Sizes are in design px. There are deliberately **no large motifs** — an earlier version had 58–88 px
ones and they were rejected as too heavy.

```ts
const dur  = 750 + Math.random() * 350;         // lifetime: 750–1100 ms
const spin = (90 + Math.random() * 80) * turn;  // total rotation: 90–170°, alternating direction
const a0   = Math.random() * 360;               // random start angle
```

```ts
o.style.left = `${x + (Math.random() - 0.5) * 20}px`;   // ±10 px scatter so motifs
o.style.top  = `${y + (Math.random() - 0.5) * 20}px`;   // don't sit on one straight line
```

Two animations run per motif, both for `dur` ms:

```ts
// outer element: the steady spin around its own centre
o.animate([{ transform: `rotate(${a0}deg)` },
           { transform: `rotate(${a0 + spin}deg)` }],
          { duration: dur, easing: 'linear', fill: 'forwards' });

// inner element: pop in, hold, fade out
i.animate([
  { transform: 'scale(0)',   opacity: 0,    offset: 0,    easing: 'cubic-bezier(.2,.9,.25,1.25)' },
  { transform: 'scale(1)',   opacity: 1,    offset: 0.16 },   // fully in at 16% of life
  { transform: 'scale(1)',   opacity: 0.95, offset: 0.4,  easing: 'ease-in' },  // fade starts at 40%
  { transform: 'scale(.82)', opacity: 0,    offset: 1 },      // gone, slightly shrunk
], { duration: dur, fill: 'forwards' }).onfinish = () => o.remove();
```

**Fade timing, in plain terms:** with `dur ≈ 900 ms`, a motif is fully visible at ~145 ms, holds
until ~360 ms, then fades for the remaining ~540 ms. After the pointer stops, the trail is empty in
about **1.2 seconds**.

---

## 4. How to change what you'll most likely want to change

**Fade faster / slower** → change `dur`:

```ts
const dur = 500 + Math.random() * 250;   // faster: 500–750 ms
const dur = 1100 + Math.random() * 500;  // slower: 1100–1600 ms
```

**Start fading earlier / later within the same lifetime** → move the `offset: 0.4` keyframe. Lower
(e.g. `0.25`) starts the fade sooner; higher (e.g. `0.6`) keeps it solid longer, then fades quickly.

**Denser or sparser trail** → change `STEP` (34). Try 24 for denser, 50 for sparser. If you go
denser, consider raising `MAX`.

**Different sizes** → edit the three branches of the `size` ternary. Keep the largest well under
40 px; bigger was already rejected.

**Spin speed** → change `spin` (90–170° over the motif's life). Note it's total rotation, so it
interacts with `dur`: the same `spin` with a shorter `dur` looks faster.

**Colour** → `--brand-accent` in `src/styles/global.css`. The `.trail svg { fill: var(--brand-accent) }`
rule in `hero.css` picks it up, so every motif follows the token.

---

## 5. Known issues to look at

These are the things that still feel off and are worth fixing:

1. **No opacity variation between motifs.** Every motif fades from the same peak opacity (1.0).
   Giving each one a random peak (say 0.55 – 1.0) would make the trail feel less mechanical.
2. **Fast pointer movement produces a visibly straight, evenly spaced line.** The ±10 px scatter is
   not enough at speed. Consider scattering perpendicular to the direction of travel instead of in a
   square, or scaling the scatter with pointer speed.
3. **Motif choice is a stepping sequence, not random.** `pick += 1 + Math.floor(Math.random() * 3)`
   walks through the eight symbols. With a dense trail the repetition is noticeable.
4. **Sizes and lifetime are independent.** A 10 px motif lives as long as a 38 px one. Tying
   lifetime loosely to size (smaller = shorter) would read more naturally.
5. **The cap is a hard stop.** At `MAX` motifs, new ones are silently dropped and the trail visibly
   thins during fast movement. Recycling the oldest motif instead would be smoother.

---

## 6. Constraints — please don't break these

- **Do not change hero timings.** The scene timeline in `initHero` (`VIDEO_AT`, `T.s1Out`, `T.s2In`,
  `T.s2Out`, `T.s3In`) comes from the approved Figma prototype and the client-approved video edit.
  The cursor pattern is completely independent of it.
- **Keep the three disable conditions** (mouse only, desktop stage only, reduced-motion) exactly as
  they are.
- **Keep the motifs inside the hero.** `.trail { inset: 0; overflow: hidden }` clips them; the effect
  must not appear anywhere else on the page.
- **Keep it non-interactive.** `.trail { pointer-events: none }` and `aria-hidden="true"` — it must
  never take clicks or be announced to screen readers.
- **Keep the colour as a token reference**, not a hard-coded hex. The client's official burgundy has
  not arrived yet, and when it does only `--brand-accent` should need editing.
- The motifs are the client's own brand shapes. Don't redraw or simplify the SVG symbols.

---

## 7. How to test a change

```bash
npm install
npm run dev     # then open http://localhost:4321/en/ and move the mouse over the hero
```

Check all of these after any change:

- Move the mouse slowly, then fast, across the hero — the trail should read the same in both.
- Stop moving: the trail should be completely gone in roughly the motif lifetime plus a bit.
- Resize the browser below 600 px width: the effect must stop entirely (mobile stage).
- Enable "reduce motion" in the OS: nothing should spawn at all.
- Scroll down past the hero: no motifs anywhere in the sections below.

Tested on Chrome (desktop and emulated mobile) only. Safari has not been checked.
