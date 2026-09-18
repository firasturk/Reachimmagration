// Design preview only — NOT part of the site. Packs one built page into a single self-contained HTML file
// (styles, fonts, images, scripts and videos inlined) so it can be opened anywhere without a server.
// Usage: npm run build && node tools/preview.mjs en   (or ar)  ->  preview/reach-home-<lang>.html
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { build } from 'esbuild';

const lang = process.argv[2] ?? 'en';
const dist = 'dist';
const mime = { '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };
const uri = (p) => `data:${mime[extname(p)]};base64,${readFileSync(p).toString('base64')}`;
let html = readFileSync(join(dist, lang, 'index.html'), 'utf8');

// 1) stylesheets -> <style>, with the Latin and Arabic font files inlined (other subsets are never requested)
html = html.replace(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"[^>]*>/g, (_, href) => {
  let css = readFileSync(join(dist, href), 'utf8');
  css = css.replace(/url\((\/_astro\/[^)]+?-(?:latin|arabic)-[^)]+?\.woff2)\)/g, (m, f) => (existsSync(join(dist, f)) ? `url(${uri(join(dist, f))})` : m));
  return `<style>${css}</style>`;
});
// 2) images
html = html.replace(/(src|poster|href)="(\/images\/[^"]+)"/g, (m, attr, f) => (attr === 'href' ? '' : `${attr}="${uri(join(dist, f))}"`));
html = html.replace(/<link rel="preload"[^>]*>/g, '');
// 3) one script: the site's entry bundled with its lazy chunks folded in
const out = await build({ entryPoints: ['src/scripts/main.ts'], bundle: true, format: 'iife', minify: true, write: false, target: 'es2020',
  define: { 'import.meta.env.PUBLIC_LEAD_ENDPOINT': 'undefined' }, loader: { '.json': 'json' } });
const js = out.outputFiles[0].text.replace(/<\/script>/g, '<\\/script>');
const videos = { bg: 'preview-assets/hero-bg-preview.mp4', loop1: 'public/video/family-walk.mp4', loop2: 'public/video/family-pool.mp4', marina: 'public/video/marina.mp4', walkTall: 'public/video/family-walk-tall.mp4', poolTall: 'public/video/family-pool-tall.mp4' };
const V = Object.fromEntries(Object.entries(videos).map(([k, p]) => [k, uri(existsSync(p) ? p : 'public/video/hero-bg.mp4')]));
const guard = `document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="/"]');if(!a)return;e.preventDefault();var t=document.getElementById('pvToast');t.textContent=(document.documentElement.lang==='ar'?'هذا الرابط يفتح صفحة مستقلة في الموقع الفعلي: ':'On the real site this opens its own page: ')+a.getAttribute('href');t.hidden=false;clearTimeout(t._h);t._h=setTimeout(function(){t.hidden=true},2600)});`;
html = html.replace(/<script type="module" src="\/_astro\/[^"]+"><\/script>/g, '');
html = html.replace('</body>', () => `<div id="pvToast" hidden style="position:fixed;inset-inline:16px;bottom:16px;z-index:999;margin-inline:auto;max-width:520px;padding:14px 18px;border-radius:14px;background:#221a1d;color:#fff;font:400 14px/1.4 system-ui;text-align:center"></div><script>window.__PREVIEW=true;window.__V=${JSON.stringify(V)};${guard}</script><script>${js}</script></body>`);
html = html.replace(/<link rel="(?:canonical|alternate|sitemap|icon)"[^>]*>/g, '').replace('<head>', '<head><meta name="robots" content="noindex">');
mkdirSync('preview', { recursive: true });
writeFileSync(`preview/reach-home-${lang}.html`, html);
console.log(`preview/reach-home-${lang}.html`, (html.length / 1048576).toFixed(1) + ' MB');
