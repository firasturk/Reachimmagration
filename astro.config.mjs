import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static output: every page is plain HTML, JavaScript only where a section needs it (hero, globe, passport, form).
// Languages are real URLs (/en/, /ar/) so each one can rank on its own; hreflang pairs are written in Base.astro.
export default defineConfig({
  site: 'https://reachimmigration.com',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  integrations: [
    sitemap({ filter: (page) => page !== 'https://reachimmigration.com/', i18n: { defaultLocale: 'en', locales: { en: 'en', ar: 'ar' } } }),
  ],
});
