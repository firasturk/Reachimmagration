// Everything here is taken from reachimmigration.com (home page, Sept 2026). Nothing is invented:
// no investment amounts, timelines or visa-free counts are stored until the client supplies them.
// `type` follows the wording of the client's own program URLs — confirm with the client before launch.

export type ProgramType = 'citizenship' | 'residency';

export interface Program {
  slug: string;
  iso2: string;           // ISO 3166-1 alpha-2 — matches the passport index dataset
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
  { slug: 'antigua-and-barbuda', iso2: 'AG', iso: '028', en: 'Antigua & Barbuda', ar: 'أنتيغوا وباربودا', type: 'citizenship', region: 'caribbean', lat: 17.12, lng: -61.85, licensed: 'https://cip.gov.ag/how-to-apply/authorised-representatives/' },
  { slug: 'australia', iso2: 'AU', iso: '036', en: 'Australia', ar: 'أستراليا', type: 'residency', region: 'oceania', lat: -25.3, lng: 133.8 },
  { slug: 'canada', iso2: 'CA', iso: '124', en: 'Canada', ar: 'كندا', type: 'residency', region: 'americas', lat: 56.1, lng: -106.3 },
  { slug: 'cyprus', iso2: 'CY', iso: '196', en: 'Cyprus', ar: 'قبرص', type: 'residency', region: 'europe', lat: 35.1, lng: 33.4 },
  { slug: 'dominica', iso2: 'DM', iso: '212', en: 'Dominica', ar: 'دومينيكا', type: 'citizenship', region: 'caribbean', lat: 15.4, lng: -61.4, licensed: 'https://www.cbiu.gov.dm/dominica-citizenship/promoters/' },
  { slug: 'egypt', iso2: 'EG', iso: '818', en: 'Egypt', ar: 'مصر', type: 'citizenship', region: 'mena', lat: 26.8, lng: 30.8 },
  { slug: 'germany', iso2: 'DE', iso: '276', en: 'Germany', ar: 'ألمانيا', type: 'residency', region: 'europe', lat: 51.2, lng: 10.4 },
  { slug: 'greece', iso2: 'GR', iso: '300', en: 'Greece', ar: 'اليونان', type: 'residency', region: 'europe', lat: 39.1, lng: 21.8 },
  { slug: 'grenada', iso2: 'GD', iso: '308', en: 'Grenada', ar: 'غرينادا', type: 'citizenship', region: 'caribbean', lat: 12.1, lng: -61.7, licensed: 'https://imagrenada.gd/agents/' },
  { slug: 'hungary', iso2: 'HU', iso: '348', en: 'Hungary', ar: 'المجر', type: 'residency', region: 'europe', lat: 47.2, lng: 19.5 },
  { slug: 'malta', iso2: 'MT', iso: '470', en: 'Malta', ar: 'مالطا', type: 'residency', region: 'europe', lat: 35.9, lng: 14.4 },
  { slug: 'nauru', iso2: 'NR', iso: '520', en: 'Nauru', ar: 'ناورو', type: 'citizenship', region: 'oceania', lat: -0.52, lng: 166.93, licensed: 'https://www.ecrcp.gov.nr/agents' },
  { slug: 'portugal', iso2: 'PT', iso: '620', en: 'Portugal', ar: 'البرتغال', type: 'residency', region: 'europe', lat: 39.4, lng: -8.2 },
  { slug: 'saint-lucia', iso2: 'LC', iso: '662', en: 'Saint Lucia', ar: 'سانت لوسيا', type: 'citizenship', region: 'caribbean', lat: 13.9, lng: -61.0, licensed: 'https://www.cipsaintlucia.com/market-agents-and-promotors' },
  { slug: 'st-kitts-and-nevis', iso2: 'KN', iso: '659', en: 'St Kitts & Nevis', ar: 'سانت كيتس ونيفيس', type: 'citizenship', region: 'caribbean', lat: 17.3, lng: -62.7, licensed: 'https://ciu.gov.kn/international-marketing-agents/' },
  { slug: 'spain', iso2: 'ES', iso: '724', en: 'Spain', ar: 'إسبانيا', type: 'residency', region: 'europe', lat: 40.4, lng: -3.7 },
  { slug: 'turkey', iso2: 'TR', iso: '792', en: 'Turkey', ar: 'تركيا', type: 'residency', region: 'europe', lat: 39.0, lng: 35.2 },
  { slug: 'united-kingdom', iso2: 'GB', iso: '826', en: 'United Kingdom', ar: 'المملكة المتحدة', type: 'residency', region: 'europe', lat: 54.0, lng: -2.0 },
  { slug: 'united-arab-emirates', iso2: 'AE', iso: '784', en: 'United Arab Emirates', ar: 'الإمارات العربية المتحدة', type: 'residency', region: 'mena', lat: 24.0, lng: 54.0 },
  { slug: 'usa', iso2: 'US', iso: '840', en: 'United States', ar: 'الولايات المتحدة', type: 'residency', region: 'americas', lat: 39.8, lng: -98.6 },
];

export interface Branch { id: string; en: string; ar: string; country: string; address: { en: string; ar: string }; phones: string[]; email?: string }
// Addresses and numbers as published on the client's contact page and agent listings (Sept 2026). Emails only where the client publishes one.
export const branches: Branch[] = [
  { id: 'amman', en: 'Jordan — Amman', ar: 'الأردن — عمّان', country: 'Jordan', address: { en: '3rd floor, 14 King Faisal Bin Abdulaziz Street, Umm Uthaina', ar: 'الطابق الثالث، 14 شارع الملك فيصل بن عبد العزيز، أم أذينة' }, phones: ['+962 6 552 1114', '+962 79 063 1087'], email: 'info@reachimmigration.com' },
  { id: 'baghdad', en: 'Iraq — Baghdad', ar: 'العراق — بغداد', country: 'Iraq', address: { en: 'Nadi Al Said Street, beside the German Embassy, Al Amirat, Al Mansour', ar: 'شارع نادي الصيد، بجانب السفارة الألمانية، الأميرات، المنصور' }, phones: ['+964 772 900 2299'] },
  { id: 'erbil', en: 'Iraq — Erbil', ar: 'العراق — أربيل', country: 'Iraq', address: { en: 'Empire Business Towers, Building T2, 15th floor, Office 2', ar: 'أبراج إمباير للأعمال، المبنى T2، الطابق 15، مكتب 2' }, phones: ['+964 66 291 3333'], email: 'erbil@reachimmigration.com' },
  { id: 'basra', en: 'Iraq — Basra', ar: 'العراق — البصرة', country: 'Iraq', address: { en: 'Al Medaan Street, beside Manawi Center Building, Manawi Basha', ar: 'شارع الميدان، بجانب بناية مركز مناوي، مناوي باشا' }, phones: ['+964 782 900 3399', '+964 772 900 3399'], email: 'basra@reachimmigration.com' },
  { id: 'cairo-5th', en: 'Egypt — Cairo, 5th Settlement', ar: 'مصر — القاهرة، التجمع الخامس', country: 'Egypt', address: { en: 'Sodic Eastown, New Cairo Gate 9, next to the AUC, Building 7, 1st floor, Office 2', ar: 'سوديك إيست تاون، بوابة 9 القاهرة الجديدة، بجوار الجامعة الأمريكية، مبنى 7، الدور الأول، مكتب 2' }, phones: ['+20 2 6330 1649'] },
  { id: 'cairo-october', en: 'Egypt — Cairo, 6 October', ar: 'مصر — القاهرة، 6 أكتوبر', country: 'Egypt', address: { en: 'Office 102, Capital Business Park B2, Plots 15–16, Sheikh Zayed City, Giza', ar: 'مكتب 102، كابيتال بيزنس بارك B2، قطعة 15–16، مدينة الشيخ زايد، الجيزة' }, phones: ['+20 2 3865 3816'] },
  { id: 'cairo-maadi', en: 'Egypt — Cairo, Maadi', ar: 'مصر — القاهرة، المعادي', country: 'Egypt', address: { en: 'Rayhanah Plaza (Morshdy Group), Zahraa Al Maadi, Tower A, 4th floor, Office 12-4', ar: 'ريحانة بلازا (مجموعة مرشدي)، زهراء المعادي، برج A، الدور الرابع، مكتب 12-4' }, phones: ['+20 2 2519 9887'] },
  { id: 'cairo-sheraton', en: 'Egypt — Cairo, Sheraton', ar: 'مصر — القاهرة، شيراتون', country: 'Egypt', address: { en: 'Office 16, 4th floor, 87 Al Mosheer Ahmed Ismail Street, Sheraton, Heliopolis', ar: 'مكتب 16، الدور الرابع، 87 شارع المشير أحمد إسماعيل، شيراتون، مصر الجديدة' }, phones: ['+20 2 2064 4175'] },
  { id: 'alexandria', en: 'Egypt — Alexandria', ar: 'مصر — الإسكندرية', country: 'Egypt', address: { en: 'Office 20, 1st floor, Four Seasons Hotel San Stefano, El Gaish Road', ar: 'مكتب 20، الدور الأول، فندق فورسيزونز سان ستيفانو، طريق الجيش' }, phones: ['+20 3 469 1361'] },
  { id: 'riyadh', en: 'Saudi Arabia — Riyadh', ar: 'السعودية — الرياض', country: 'Saudi Arabia', address: { en: 'Al Takhasosi Street, Al Thumamah Road, above Al Jazira Bank, 2nd floor, Office 23', ar: 'شارع التخصصي، طريق الثمامة، فوق بنك الجزيرة، الدور الثاني، مكتب 23' }, phones: ['+966 11 402 1112'] },
  { id: 'jeddah', en: 'Saudi Arabia — Jeddah', ar: 'السعودية — جدة', country: 'Saudi Arabia', address: { en: 'Office 504, 5th floor, Arkan Building, Nahdat Al Tareekh Street, Al Rawda', ar: 'مكتب 504، الدور الخامس، مبنى أركان، شارع نهضة التاريخ، حي الروضة' }, phones: ['+966 12 288 9772', '+966 50 203 3325'], email: 'jeddah@reachimmigration.com' },
  { id: 'khobar', en: 'Saudi Arabia — Khobar', ar: 'السعودية — الخبر', country: 'Saudi Arabia', address: { en: 'Office 905, 9th floor, Awj Tower, Prince Turki Road', ar: 'مكتب 905، الدور التاسع، برج أوج، طريق الأمير تركي' }, phones: ['+966 13 882 0022'] },
  { id: 'doha', en: 'Qatar — Doha', ar: 'قطر — الدوحة', country: 'Qatar', address: { en: 'Office 3, 22nd floor, Amwal Tower, Al Sufara Street, West Bay', ar: 'مكتب 3، الطابق 22، برج أموال، شارع السفراء، الخليج الغربي' }, phones: ['+974 4450 4390', '+974 3322 2773'], email: 'doha@reachimmigration.com' },
  { id: 'dubai', en: 'United Arab Emirates — Dubai', ar: 'الإمارات — دبي', country: 'UAE', address: { en: 'Office 505, 5th floor, U-Bora Tower, Towers Street, Business Bay', ar: 'مكتب 505، الطابق الخامس، برج يو بورا، شارع الأبراج، الخليج التجاري' }, phones: ['+971 4 514 7669'] },
  { id: 'kuwait', en: 'Kuwait', ar: 'الكويت', country: 'Kuwait', address: { en: 'Office 43, 15th floor, Salwa Tower, Abdul Aziz Al Saqr Street, Block 1, Al Murqab, Kuwait City', ar: 'مكتب 43، الطابق 15، برج سلوى، شارع عبد العزيز الصقر، قطعة 1، المرقاب، مدينة الكويت' }, phones: ['+965 9922 6271'] },
  { id: 'istanbul', en: 'Turkey — Istanbul', ar: 'تركيا — إسطنبول', country: 'Turkey', address: { en: 'Nidakule, Kayaşehir Bulvarı No. 45, 25th floor, No. 180, Kayabaşı, Başakşehir', ar: 'نيدا كوله، جادة كاياشهير رقم 45، الطابق 25، رقم 180، كاياباشي، باشاك شهير' }, phones: ['+90 212 285 19 45'] },
  { id: 'larnaca', en: 'Cyprus — Larnaca', ar: 'قبرص — لارنكا', country: 'Cyprus', address: { en: 'Vasileos Evagorou 14, 6023 Larnaca', ar: 'شارع فاسيليوس إيفاغورو 14، 6023 لارنكا' }, phones: ['+357 24 666 969', '+357 96 909 069'], email: 'cyprus@reachimmigration.com' },
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
  reviewsUrl: 'https://reachimmigration.com/en/reviews/',
  blogUrl: 'https://reachimmigration.com/en/blog/',
};

// Head office, from the client's contact page. Branch phone numbers and addresses are added to `branches` as the client supplies them.
export const CONTACT = {
  address: { en: '3rd floor, 14 King Faisal Bin Abdulaziz Street, Umm Uthaina, Amman, Jordan', ar: 'الطابق الثالث، 14 شارع الملك فيصل بن عبد العزيز، أم أذينة، عمّان، الأردن' },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Reach+Immigration+Umm+Uthaina+Amman',
  phones: ['+962 6 552 1114', '+962 79 063 1087'],
  whatsapp: '962790631087',           // digits only, used for wa.me links — confirm with the client before launch
  email: 'info@reachimmigration.com',
};
