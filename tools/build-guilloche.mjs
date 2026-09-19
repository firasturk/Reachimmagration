// Rasterises the passport page guilloché (the brand rosette, tiled) into one small WebP tile with the opacity baked in.
// A bitmap tile paints for free; the same pattern as live SVG cost a full re-rasterisation of every page on each frame.
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
const src = readFileSync(new URL('../src/data/motifs.ts', import.meta.url), 'utf8');
const m = src.match(/rm1 = \{ viewBox: '([^']+)', d: '([^']+)' \}/);
const [, vb, d] = m;
const T = 96, S = 2;                                                           // 96 css px tile, rendered at 2×
const use = (x, y, w, o) => `<use href="#r" x="${x}" y="${y}" width="${w}" height="${w}" opacity="${o}"/>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${T * S}" height="${T * S}" viewBox="0 0 ${T} ${T}">
<defs><symbol id="r" viewBox="${vb}"><path d="${d}" fill="#7f3450"/></symbol></defs>
<g transform="rotate(12 48 48)" opacity=".075">${use(4, 4, 40, 1)}${use(52, 52, 40, 1)}${use(52, 4, 18, .6)}${use(4, 52, 18, .6)}
${use(-44, 4, 40, 1)}${use(100, 52, 40, 1)}${use(4, -44, 40, 1)}${use(52, 100, 40, 1)}</g></svg>`;
const out = new URL('../public/images/passport-guilloche.webp', import.meta.url);
const buf = await sharp(Buffer.from(svg)).webp({ quality: 80, alphaQuality: 90 }).toBuffer();
writeFileSync(out, buf); console.log('public/images/passport-guilloche.webp', buf.length, 'bytes');
