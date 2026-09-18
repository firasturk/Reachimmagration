// Turns the open Passport Index dataset (tools/data/passport-index-matrix-iso2.csv, MIT, scraped from passportindex.org)
// into src/data/passport-index.json: one ranked row per passport plus a compact access matrix for the comparison tool.
// Refresh: drop a newer CSV in tools/data/ (https://github.com/imorte/passport-index-data), set UPDATED, run `npm run passport-index`.
import { readFileSync, writeFileSync } from 'node:fs';

const UPDATED = '2026-02-17';
const csv = readFileSync(new URL('./data/passport-index-matrix-iso2.csv', import.meta.url), 'utf8').trim().split('\n').map((l) => l.split(',').map((c) => c.trim()));
const header = csv[0].slice(1).filter(Boolean);
const rows = csv.slice(1).filter((r) => r[0]);

// requirement → one letter: F visa-free · O visa on arrival · A eTA · E e-visa · R visa required · N no admission · S self
const code = (v) => {
  if (v === '-1') return 'S';
  if (/^\d+$/.test(v) || v === 'visa free') return 'F';
  if (v === 'visa on arrival') return 'O';
  if (v === 'eta') return 'A';
  if (v === 'e-visa') return 'E';
  if (v === 'no admission') return 'N';
  return 'R';
};
const en = new Intl.DisplayNames(['en'], { type: 'region' });
const ar = new Intl.DisplayNames(['ar'], { type: 'region' });
const name = (dn, c) => { try { const n = dn.of(c); return n && n !== c ? n : null; } catch { return null; } };
const fallback = { XK: ['Kosovo', 'كوسوفو'] };

const passports = rows.map((r) => {
  const access = header.map((_, i) => code(r[i + 1] ?? 'visa required')).join('');
  const n = { F: 0, O: 0, A: 0, E: 0, R: 0, N: 0 };
  for (const ch of access) if (ch in n) n[ch]++;
  const c = r[0];
  return { c, en: name(en, c) ?? fallback[c]?.[0] ?? c, ar: name(ar, c) ?? fallback[c]?.[1] ?? c, f: n.F, o: n.O, a: n.A, e: n.E, r: n.R + n.N, score: n.F + n.O + n.A, access };
});
passports.sort((x, y) => y.score - x.score || y.f - x.f || x.en.localeCompare(y.en));
let rank = 0, prev = -1;
for (const [i, p] of passports.entries()) { if (p.score !== prev) { rank = i + 1; prev = p.score; } p.rank = rank; }

const destinations = header.map((c) => ({ c, en: name(en, c) ?? fallback[c]?.[0] ?? c, ar: name(ar, c) ?? fallback[c]?.[1] ?? c }));
writeFileSync(new URL('../src/data/passport-index.json', import.meta.url), JSON.stringify({ updated: UPDATED, destinations, passports }));
console.log(`${passports.length} passports × ${destinations.length} destinations → src/data/passport-index.json`);
console.log(passports.slice(0, 5).map((p) => `${p.rank}. ${p.en} ${p.score}`).join(' · '));
for (const c of ['JO', 'IQ', 'EG', 'SA', 'GD', 'KN', 'DM', 'AG', 'LC', 'NR', 'TR', 'AE']) { const p = passports.find((x) => x.c === c); console.log(c, p.rank, p.score, p.en, p.ar); }
