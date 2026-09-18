// Everything here is taken from reachimmigration.com (home page, Sept 2026). Nothing is invented:
// no investment amounts, timelines or visa-free counts are stored until the client supplies them.
// `type` follows the wording of the client's own program URLs — confirm with the client before launch.

export type ProgramType = 'citizenship' | 'residency';

export interface Program {
  slug: string;
  iso: string;            // ISO 3166-1 numeric — matches world-atlas feature ids
  en: string;
  ar: string;
  type: ProgramType;
  region: 'caribbean' | 'europe' | 'mena' | 'americas' | 'oceania';
  lat: number;
  lng: number;
  licensed?: string;      // official government page listing Reach as an authorised agent
}

export const programs: Program[] = [
  { slug: 'antigua-and-barbuda', iso: '028', en: 'Antigua & Barbuda', ar: 'أنتيغوا وباربودا', type: 'citizenship', region: 'caribbean', lat: 17.12, lng: -61.85, licensed: 'https://cip.gov.ag/how-to-apply/authorised-representatives/' },
  { slug: 'australia', iso: '036', en: 'Australia', ar: 'أستراليا', type: 'residency', region: 'oceania', lat: -25.3, lng: 133.8 },
  { slug: 'canada', iso: '124', en: 'Canada', ar: 'كندا', type: 'residency', region: 'americas', lat: 56.1, lng: -106.3 },
  { slug: 'cyprus', iso: '196', en: 'Cyprus', ar: 'قبرص', type: 'residency', region: 'europe', lat: 35.1, lng: 33.4 },
  { slug: 'dominica', iso: '212', en: 'Dominica', ar: 'دومينيكا', type: 'citizenship', region: 'caribbean', lat: 15.4, lng: -61.4, licensed: 'https://www.cbiu.gov.dm/dominica-citizenship/promoters/' },
  { slug: 'egypt', iso: '818', en: 'Egypt', ar: 'مصر', type: 'citizenship', region: 'mena', lat: 26.8, lng: 30.8 },
  { slug: 'germany', iso: '276', en: 'Germany', ar: 'ألمانيا', type: 'residency', region: 'europe', lat: 51.2, lng: 10.4 },
  { slug: 'greece', iso: '300', en: 'Greece', ar: 'اليونان', type: 'residency', region: 'europe', lat: 39.1, lng: 21.8 },
  { slug: 'grenada', iso: '308', en: 'Grenada', ar: 'غرينادا', type: 'citizenship', region: 'caribbean', lat: 12.1, lng: -61.7, licensed: 'https://imagrenada.gd/agents/' },
  { slug: 'hungary', iso: '348', en: 'Hungary', ar: 'المجر', type: 'residency', region: 'europe', lat: 47.2, lng: 19.5 },
  { slug: 'malta', iso: '470', en: 'Malta', ar: 'مالطا', type: 'residency', region: 'europe', lat: 35.9, lng: 14.4 },
  { slug: 'nauru', iso: '520', en: 'Nauru', ar: 'ناورو', type: 'citizenship', region: 'oceania', lat: -0.52, lng: 166.93, licensed: 'https://www.ecrcp.gov.nr/agents' },
  { slug: 'portugal', iso: '620', en: 'Portugal', ar: 'البرتغال', type: 'residency', region: 'europe', lat: 39.4, lng: -8.2 },
  { slug: 'saint-lucia', iso: '662', en: 'Saint Lucia', ar: 'سانت لوسيا', type: 'citizenship', region: 'caribbean', lat: 13.9, lng: -61.0, licensed: 'https://www.cipsaintlucia.com/market-agents-and-promotors' },
  { slug: 'st-kitts-and-nevis', iso: '659', en: 'St Kitts & Nevis', ar: 'سانت كيتس ونيفيس', type: 'citizenship', region: 'caribbean', lat: 17.3, lng: -62.7, licensed: 'https://ciu.gov.kn/international-marketing-agents/' },
  { slug: 'spain', iso: '724', en: 'Spain', ar: 'إسبانيا', type: 'residency', region: 'europe', lat: 40.4, lng: -3.7 },
  { slug: 'turkey', iso: '792', en: 'Turkey', ar: 'تركيا', type: 'residency', region: 'europe', lat: 39.0, lng: 35.2 },
  { slug: 'united-kingdom', iso: '826', en: 'United Kingdom', ar: 'المملكة المتحدة', type: 'residency', region: 'europe', lat: 54.0, lng: -2.0 },
  { slug: 'united-arab-emirates', iso: '784', en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة', type: 'residency', region: 'mena', lat: 24.0, lng: 54.0 },
  { slug: 'usa', iso: '840', en: 'United States', ar: 'الولايات المتحدة', type: 'residency', region: 'americas', lat: 39.8, lng: -98.6 },
];

export interface Branch { id: string; en: string; ar: string; country: string }
export const branches: Branch[] = [
  { id: 'amman', en: 'Jordan — Amman', ar: 'الأردن — عمّان', country: 'Jordan' },
  { id: 'baghdad', en: 'Iraq — Baghdad', ar: 'العراق — بغداد', country: 'Iraq' },
  { id: 'erbil', en: 'Iraq — Erbil', ar: 'العراق — أربيل', country: 'Iraq' },
  { id: 'basra', en: 'Iraq — Basra', ar: 'العراق — البصرة', country: 'Iraq' },
  { id: 'cairo-5th', en: 'Egypt — Cairo, 5th Settlement', ar: 'مصر — القاهرة، التجمع الخامس', country: 'Egypt' },
  { id: 'cairo-october', en: 'Egypt — Cairo, 6 October', ar: 'مصر — القاهرة، 6 أكتوبر', country: 'Egypt' },
  { id: 'cairo-maadi', en: 'Egypt — Cairo, Maadi', ar: 'مصر — القاهرة، المعادي', country: 'Egypt' },
  { id: 'cairo-sheraton', en: 'Egypt — Cairo, Sheraton', ar: 'مصر — القاهرة، شيراتون', country: 'Egypt' },
  { id: 'alexandria', en: 'Egypt — Alexandria', ar: 'مصر — الإسكندرية', country: 'Egypt' },
  { id: 'riyadh', en: 'Saudi Arabia — Riyadh', ar: 'السعودية — الرياض', country: 'Saudi Arabia' },
  { id: 'jeddah', en: 'Saudi Arabia — Jeddah', ar: 'السعودية — جدة', country: 'Saudi Arabia' },
  { id: 'khobar', en: 'Saudi Arabia — Khobar', ar: 'السعودية — الخبر', country: 'Saudi Arabia' },
  { id: 'doha', en: 'Qatar — Doha', ar: 'قطر — الدوحة', country: 'Qatar' },
  { id: 'dubai', en: 'United Arab Emirates — Dubai', ar: 'الإمارات — دبي', country: 'UAE' },
  { id: 'kuwait', en: 'Kuwait', ar: 'الكويت', country: 'Kuwait' },
  { id: 'istanbul', en: 'Turkey — Istanbul', ar: 'تركيا — إسطنبول', country: 'Turkey' },
  { id: 'larnaca', en: 'Cyprus — Larnaca', ar: 'قبرص — لارنكا', country: 'Cyprus' },
];

// Same list as the client's current call-back form. `branch` = first branch suggested for that nationality.
export const nationalities: { en: string; ar: string; branch?: string }[] = [
  { en: 'Algeria', ar: 'الجزائر' }, { en: 'Bahrain', ar: 'البحرين', branch: 'khobar' }, { en: 'Egypt', ar: 'مصر', branch: 'cairo-5th' },
  { en: 'India', ar: 'الهند', branch: 'dubai' }, { en: 'Iran', ar: 'إيران' }, { en: 'Iraq', ar: 'العراق', branch: 'baghdad' },
  { en: 'Jordan', ar: 'الأردن', branch: 'amman' }, { en: 'Kuwait', ar: 'الكويت', branch: 'kuwait' }, { en: 'Lebanon', ar: 'لبنان', branch: 'amman' },
  { en: 'Libya', ar: 'ليبيا', branch: 'cairo-5th' }, { en: 'Morocco', ar: 'المغرب' }, { en: 'Nigeria', ar: 'نيجيريا' }, { en: 'Oman', ar: 'عُمان', branch: 'dubai' },
  { en: 'Pakistan', ar: 'باكستان', branch: 'dubai' }, { en: 'Palestine', ar: 'فلسطين', branch: 'amman' }, { en: 'Philippines', ar: 'الفلبين', branch: 'dubai' },
  { en: 'Qatar', ar: 'قطر', branch: 'doha' }, { en: 'Saudi Arabia', ar: 'السعودية', branch: 'riyadh' }, { en: 'Sudan', ar: 'السودان', branch: 'cairo-5th' },
  { en: 'Syria', ar: 'سوريا', branch: 'amman' }, { en: 'Tunisia', ar: 'تونس' }, { en: 'Turkey', ar: 'تركيا', branch: 'istanbul' },
  { en: 'UAE', ar: 'الإمارات', branch: 'dubai' }, { en: 'United Kingdom', ar: 'المملكة المتحدة' }, { en: 'United States', ar: 'الولايات المتحدة' },
  { en: 'Yemen', ar: 'اليمن', branch: 'amman' }, { en: 'Other', ar: 'أخرى' },
];

export const socials = [
  { name: 'Facebook', url: 'https://www.facebook.com/ReachImmigration/' },
  { name: 'Instagram', url: 'https://www.instagram.com/reachimmigration/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/reach-immigration---ri/' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCTaovttUyZak_jhj11Ryp8g' },
  { name: 'X', url: 'https://twitter.com/reachmigration' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@reachimmigration' },
];

// Latest posts — placeholder feed until the CMS/blog is connected. Titles and links are the client's own.
export const insights = [
  { title: 'Caribbean Countries Consider Suspending Citizenship by Investment Programs', date: '2026-08-03', tag: 'Newsletter', url: 'https://reachimmigration.com/en/newsletter/caribbean-countries-consider-suspending-citizenship-by-investment-programs/' },
  { title: 'Amendments to the Portuguese Nationality Law – 2026', date: '2026-05-05', tag: 'Newsletter', url: 'https://reachimmigration.com/en/newsletter/amendments-to-the-portuguese-nationality-law-2026/' },
  { title: 'Cyprus in the Final Stages Toward Schengen 2026', date: '2026-04-28', tag: 'Blog', url: 'https://reachimmigration.com/en/blog/cyprus-schengen-2026-investment-opportunity/' },
];

// Client stories are real people's words: they must be pasted verbatim from the client's approved copy, never written by us.
// Shape: { name, role?, quote: { en, ar }, photo? }. While this array is empty the section shows the Google rating only.
export const stories: { name: string; role?: string; quote: { en: string; ar: string }; photo?: string }[] = [];

export const SITE = {
  url: 'https://reachimmigration.com',
  name: 'Reach Immigration',
  founded: '2000',
  minInvestmentUsd: 150000,
  google: { rating: '5.0', reviews: 86 },
};
