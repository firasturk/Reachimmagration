// Copy for the inner pages (program page labels, route landings, about, contact, legal, 404). Home-page copy stays in ui.ts.
import type { Lang } from './ui';

const en = {
  prog: {
    updated: 'Figures indicative as of', disclaimer: 'Amounts, fees and processing times change with each government’s rules. A consultant confirms the current terms for your family before anything is signed.',
    why: 'Why families choose it', options: 'Investment routes', from: 'from', process: 'How it works', family: 'Who can be included', facts: 'At a glance', faq: 'Questions people ask', related: 'Other programs in', otherRoute: 'You may also consider', assess: 'Assess my case for', talk: 'Talk to a consultant', licensedNote: 'Reach Immigration is listed by the government as an authorised agent for this program.', verify: 'See the official list',
  },
  routes: {
    citizenship: {
      title: ['Citizenship', 'By Investment'], tag: '[ Second Passport ]',
      text: 'A second citizenship is the strongest plan B a family can hold: a passport that travels further, assets in a second jurisdiction and a home you can always return to. These are the programs where Reach files applications as a government-listed agent.',
      meta: 'Citizenship by Investment Programs | Reach Immigration', desc: 'Second passport programs in the Caribbean, Egypt, Nauru and Turkey with Reach Immigration, a government-listed agent since 2000. Compare routes, amounts and timelines.',
      points: [
        { t: 'From 3 months', p: 'Caribbean and Pacific programs decide within three to eight months, with no visit required in most cases.' },
        { t: 'From USD 105,000', p: 'Contribution, real-estate and bond routes, so the same passport fits different budgets.' },
        { t: 'For generations', p: 'Citizenship passes to children born after approval, and dependants join the first application.' },
        { t: 'Filed by a licensed agent', p: 'Six governments list Reach as an authorised agent. Your file goes in through us, not a middleman.' },
      ],
    },
    residency: {
      title: ['Residency', 'By Investment'], tag: '[ Live Abroad ]',
      text: 'Residency gives your family the right to live, study and do business in the country you choose, often with a path to citizenship after a few years. Europe, the Gulf, North America and Australia each offer a different balance of cost, presence and time.',
      meta: 'Residency by Investment & Migration Programs | Reach Immigration', desc: 'Golden visas, investor residencies and skilled-migration routes in Europe, the UAE, the USA, Canada and Australia. Reach Immigration advises families across the region since 2000.',
      points: [
        { t: 'Europe from EUR 250,000', p: 'Greece, Portugal, Hungary, Cyprus and Malta grant residency through property, funds or donations.' },
        { t: 'Little or no minimum stay', p: 'Most golden visas need a few days a year, or none, to stay valid.' },
        { t: 'Schooling and healthcare', p: 'Children study in public or international schools; families access national health systems.' },
        { t: 'A path to citizenship', p: 'Portugal after five years, Greece after seven, Canada and the USA once you settle.' },
      ],
    },
    compare: 'Programs on this route', all: 'See all 20 programs',
  },
  about: {
    meta: 'About Reach Immigration | Investment Migration Consultants Since 2000', desc: 'Reach Immigration has advised families on second citizenship and residency by investment since 2000: head office in Amman, 17 branches in 9 countries, ISO 9001 certified and listed by six governments as an authorised agent.',
    tag: '[ About Reach ]', title: ['Twenty-Six Years', 'Of Opening Doors'],
    text: 'Reach Immigration was founded in Amman in 2000, when investment migration was still a niche few families in the region knew about. Today we are one of its most established consultancies, with 17 branches, more than 80 consultants and government licences in six countries.',
    stats: [{ n: '2000', l: 'Founded in Amman' }, { n: '17', l: 'Branches in 9 countries' }, { n: '80+', l: 'Consultants and experts' }, { n: '20', l: 'Destinations advised' }, { n: '6', l: 'Government licences' }, { n: '5.0', l: 'Google rating' }],
    storyTag: '[ Our Story ]', storyTitle: ['From One Office', 'To A Region'],
    story: [
      'We started with a single office and a simple promise: tell families the truth about what a program costs, how long it takes and what their real chances are. That promise has not changed; the map has. Branches followed our clients to Iraq, Egypt, Saudi Arabia, Qatar, the Emirates, Kuwait, Turkey and Cyprus.',
      'Along the way, governments started listing Reach as an authorised agent, first in the Caribbean and then further afield. Being on those official lists means our files go straight to the citizenship units, and it means we are accountable to them for every application we submit.',
      'In 2021 we launched the Reach Passport Index to help clients compare travel freedom, and we certified our processes to ISO 9001 so that a family in Basra gets the same service as a family in Dubai.',
    ],
    valuesTag: '[ How We Work ]', valuesTitle: ['Built On', 'Trust'],
    values: [
      { t: 'Transparency', p: 'Every cost, government fee and timeline is written down before you commit. No surprises after signing.' },
      { t: 'Credibility', p: 'Listed as an authorised agent by six governments and certified to ISO 9001. We are answerable for what we file.' },
      { t: 'Experience', p: 'Thousands of families advised since 2000, across every route from Caribbean citizenship to EB-5.' },
      { t: 'Presence', p: 'Seventeen branches mean a consultant who speaks your dialect, in your city, before and after approval.' },
    ],
    stepsTag: '[ Your Journey ]', stepsTitle: ['Four Steps', 'To Approval'],
    steps: [
      { t: 'Free assessment', p: 'We listen to your goals and budget, then shortlist the programs that genuinely fit.' },
      { t: 'Program and investment', p: 'You choose the route; we pre-check your documents and reserve the property, fund or contribution.' },
      { t: 'Filing and due diligence', p: 'Our legal team prepares and submits the application and answers every query from the authority.' },
      { t: 'Approval and beyond', p: 'We collect your certificates and passports, and stay with you for renewals and the next generation.' },
    ],
    branchesTag: '[ Where We Are ]', branchesTitle: ['Seventeen', 'Branches'], branchesText: 'Head office in Amman, with branches across the Middle East, North Africa and Europe.', contactCta: 'Contact & branches', licensesCta: 'Verify our licences',
  },
  contact: {
    meta: 'Contact Reach Immigration | Head Office & 17 Branches', desc: 'Call, WhatsApp or visit Reach Immigration: head office in Amman and branches in Iraq, Egypt, Saudi Arabia, Qatar, the UAE, Kuwait, Turkey and Cyprus. Free consultation.',
    tag: '[ Contact ]', title: ['Talk To', 'A Consultant'],
    text: 'Call the head office, message us on WhatsApp, or leave your details below and the branch nearest you calls you back. Consultations are free and in your language.',
    hq: 'Head office', address: 'Address', phone: 'Phone', whatsapp: 'WhatsApp', email: 'Email', hours: 'Opening hours', hoursValue: 'Saturday to Thursday, 9:00–17:30 · Closed on Friday', directions: 'Open in Google Maps', call: 'Call now', chat: 'Chat on WhatsApp',
    branchesTitle: ['Our', 'Branches'], branchesText: 'Seventeen offices in nine countries. Call the one nearest you, or choose it in the form and a consultant from that office will call you back.',
  },
  legal: {
    privacyMeta: 'Privacy Policy | Reach Immigration', termsMeta: 'Terms of Use | Reach Immigration', privacyTitle: ['Privacy', 'Policy'], termsTitle: ['Terms', 'Of Use'], tag: '[ Legal ]', updated: 'Last updated',
  },
  passport: {
    meta: 'Passport Index 2026 | Compare 199 Passports | Reach Immigration', desc: 'Every passport ranked by the destinations it opens without a visa in advance. Pick your passport, add a second one and see exactly which countries it would unlock.',
    tag: '[ Passport Index ]', title: ['Passport', 'Index'],
    text: 'Every passport in the world ranked by how many destinations it opens without a visa in advance: visa-free, visa on arrival or an electronic travel authorisation. Choose your passport, add a second one and see exactly what would change.',
    updated: 'Data updated', source: 'Built on public visa-requirement data (passportindex.org), processed by Reach. Rules change often; confirm before you travel.',
    yours: 'Your passport', second: 'Second passport', rank: 'Rank', score: 'Destinations', vf: 'Visa-free', voa: 'Visa on arrival', eta: 'eTA', evisa: 'e-Visa', required: 'Visa required',
    adds: 'What the second passport adds', addsNone: 'This passport opens no destinations that yours does not already open.', combined: 'Together they open', of: 'of', destinations: 'destinations',
    newVf: 'Newly visa-free', newVoa: 'Newly visa on arrival', newEta: 'Newly eTA',
    program: 'Reach program', view: 'View program', table: 'All 199 passports', search: 'Search a passport…', noResults: 'No passport matches.',
    cta: 'Could one of these passports be yours?', ctaBtn: 'Assess my case',
  },
  notFound: { title: 'Page not found', text: 'The page you are looking for has moved or no longer exists.', home: 'Back to the home page', programs: 'Browse the programs' },
};

const ar: typeof en = {
  prog: {
    updated: 'أرقام إرشادية بتاريخ', disclaimer: 'تتغير المبالغ والرسوم ومدد المعالجة مع قواعد كل حكومة. يؤكد المستشار الشروط الحالية لعائلتك قبل توقيع أي شيء.',
    why: 'لماذا تختاره العائلات', options: 'مسارات الاستثمار', from: 'ابتداءً من', process: 'كيف يتم الأمر', family: 'من يمكن ضمّه', facts: 'نظرة سريعة', faq: 'أسئلة شائعة', related: 'برامج أخرى في', otherRoute: 'قد يناسبك أيضاً', assess: 'قيّم حالتي لبرنامج', talk: 'تحدّث إلى مستشار', licensedNote: 'ريتش للهجرة مُدرجة لدى الحكومة كوكيل معتمد لهذا البرنامج.', verify: 'اطّلع على القائمة الرسمية',
  },
  routes: {
    citizenship: {
      title: ['الجنسية', 'عن طريق الاستثمار'], tag: '[ جواز سفر ثانٍ ]',
      text: 'الجنسية الثانية هي أقوى خطة بديلة يمكن أن تمتلكها عائلة: جواز يسافر أبعد، وأصول في بلد ثانٍ، ووطن يمكنك العودة إليه دائماً. هذه هي البرامج التي تقدّم فيها ريتش الطلبات بصفتها وكيلاً معتمداً لدى الحكومات.',
      meta: 'برامج الجنسية عن طريق الاستثمار | ريتش للهجرة', desc: 'برامج الجواز الثاني في الكاريبي ومصر وناورو وتركيا مع ريتش للهجرة، الوكيل المعتمد لدى الحكومات منذ عام 2000. قارن المسارات والمبالغ والمدد.',
      points: [
        { t: 'من 3 أشهر', p: 'تبتّ برامج الكاريبي والمحيط الهادئ في الطلبات خلال ثلاثة إلى ثمانية أشهر، ودون زيارة في معظم الحالات.' },
        { t: 'من 105,000 دولار أمريكي', p: 'مسارات المساهمة والعقارات والسندات، فيناسب الجواز نفسه ميزانيات مختلفة.' },
        { t: 'لأجيال', p: 'تنتقل الجنسية إلى الأبناء المولودين بعد الموافقة، ويُضمّ المعالون في الطلب الأول.' },
        { t: 'بيد وكيل مرخّص', p: 'ست حكومات تُدرج ريتش وكيلاً معتمداً. ملفك يُقدَّم عبرنا مباشرة لا عبر وسيط.' },
      ],
    },
    residency: {
      title: ['الإقامة', 'عن طريق الاستثمار'], tag: '[ عِش في الخارج ]',
      text: 'تمنح الإقامة عائلتك حق العيش والدراسة والعمل في البلد الذي تختاره، وغالباً مع طريق إلى الجنسية بعد بضع سنوات. أوروبا والخليج وأمريكا الشمالية وأستراليا تقدّم كل منها توازناً مختلفاً بين التكلفة والحضور والوقت.',
      meta: 'برامج الإقامة عن طريق الاستثمار والهجرة | ريتش للهجرة', desc: 'التأشيرات الذهبية وإقامات المستثمرين ومسارات الهجرة للكفاءات في أوروبا والإمارات وأمريكا وكندا وأستراليا. ريتش للهجرة تقدّم المشورة للعائلات في المنطقة منذ عام 2000.',
      points: [
        { t: 'أوروبا من 250,000 يورو', p: 'اليونان والبرتغال والمجر وقبرص ومالطا تمنح الإقامة عبر العقار أو الصناديق أو التبرعات.' },
        { t: 'حضور قليل أو معدوم', p: 'معظم التأشيرات الذهبية تحتاج بضعة أيام في السنة، أو لا شيء، لتبقى سارية.' },
        { t: 'التعليم والرعاية الصحية', p: 'يدرس الأبناء في المدارس الحكومية أو الدولية، وتحصل العائلة على الأنظمة الصحية الوطنية.' },
        { t: 'طريق إلى الجنسية', p: 'البرتغال بعد خمس سنوات، واليونان بعد سبع، وكندا وأمريكا بعد الاستقرار.' },
      ],
    },
    compare: 'برامج هذا المسار', all: 'اطّلع على البرامج العشرين',
  },
  about: {
    meta: 'عن ريتش للهجرة | مستشارو الهجرة الاستثمارية منذ عام 2000', desc: 'تقدّم ريتش للهجرة المشورة للعائلات في الجنسية الثانية والإقامة عن طريق الاستثمار منذ عام 2000: المقر الرئيسي في عمّان و17 فرعاً في 9 دول، حاصلة على ISO 9001 ومُدرجة لدى ست حكومات كوكيل معتمد.',
    tag: '[ عن ريتش ]', title: ['ستة وعشرون عاماً', 'من فتح الأبواب'],
    text: 'تأسست ريتش للهجرة في عمّان عام 2000، حين كانت الهجرة الاستثمارية مجالاً لا تعرفه إلا عائلات قليلة في المنطقة. اليوم نحن من أعرق شركاتها الاستشارية، بـ17 فرعاً وأكثر من 80 مستشاراً وتراخيص حكومية في ست دول.',
    stats: [{ n: '2000', l: 'سنة التأسيس في عمّان' }, { n: '17', l: 'فرعاً في 9 دول' }, { n: '+80', l: 'مستشاراً وخبيراً' }, { n: '20', l: 'وجهة نقدّم الاستشارة فيها' }, { n: '6', l: 'تراخيص حكومية' }, { n: '5.0', l: 'تقييم Google' }],
    storyTag: '[ قصتنا ]', storyTitle: ['من مكتب واحد', 'إلى منطقة كاملة'],
    story: [
      'بدأنا بمكتب واحد ووعد بسيط: أن نقول للعائلات الحقيقة عن تكلفة البرنامج ومدته وفرصهم الحقيقية فيه. لم يتغير الوعد، بل تغيّرت الخريطة. تبعت الفروع عملاءنا إلى العراق ومصر والسعودية وقطر والإمارات والكويت وتركيا وقبرص.',
      'وفي الطريق بدأت الحكومات تُدرج ريتش وكيلاً معتمداً، في الكاريبي أولاً ثم أبعد من ذلك. وجودنا في تلك القوائم الرسمية يعني أن ملفاتنا تصل مباشرة إلى وحدات الجنسية، ويعني أننا مسؤولون أمامها عن كل طلب نقدّمه.',
      'في عام 2021 أطلقنا مؤشر ريتش لجوازات السفر لمساعدة العملاء على مقارنة حرية السفر، واعتمدنا إجراءاتنا وفق ISO 9001 لتحصل عائلة في البصرة على الخدمة نفسها التي تحصل عليها عائلة في دبي.',
    ],
    valuesTag: '[ كيف نعمل ]', valuesTitle: ['مبنيّة', 'على الثقة'],
    values: [
      { t: 'الشفافية', p: 'كل تكلفة ورسم حكومي ومدة زمنية تُكتب قبل أن تلتزم. لا مفاجآت بعد التوقيع.' },
      { t: 'المصداقية', p: 'مُدرجون كوكيل معتمد لدى ست حكومات وحاصلون على ISO 9001. نحن مسؤولون عمّا نقدّمه.' },
      { t: 'الخبرة', p: 'آلاف العائلات منذ عام 2000، في كل المسارات من جنسية الكاريبي إلى EB-5.' },
      { t: 'القرب', p: 'سبعة عشر فرعاً تعني مستشاراً يتحدث لهجتك، في مدينتك، قبل الموافقة وبعدها.' },
    ],
    stepsTag: '[ رحلتك ]', stepsTitle: ['أربع خطوات', 'حتى الموافقة'],
    steps: [
      { t: 'تقييم مجاني', p: 'نستمع إلى أهدافك وميزانيتك، ثم نختار لك البرامج التي تناسبك فعلاً.' },
      { t: 'البرنامج والاستثمار', p: 'تختار المسار، ونراجع وثائقك مسبقاً ونحجز العقار أو الصندوق أو المساهمة.' },
      { t: 'التقديم والتدقيق', p: 'يُعدّ فريقنا القانوني الطلب ويقدّمه ويجيب عن كل استفسار من الجهة المختصة.' },
      { t: 'الموافقة وما بعدها', p: 'نستلم شهاداتك وجوازاتك، ونبقى معك في التجديدات وللجيل التالي.' },
    ],
    branchesTag: '[ أين نحن ]', branchesTitle: ['سبعة عشر', 'فرعاً'], branchesText: 'المقر الرئيسي في عمّان، وفروع في الشرق الأوسط وشمال أفريقيا وأوروبا.', contactCta: 'التواصل والفروع', licensesCta: 'تحقّق من تراخيصنا',
  },
  contact: {
    meta: 'تواصل مع ريتش للهجرة | المقر الرئيسي و17 فرعاً', desc: 'اتصل أو راسلنا عبر واتساب أو زر ريتش للهجرة: المقر الرئيسي في عمّان وفروع في العراق ومصر والسعودية وقطر والإمارات والكويت وتركيا وقبرص. استشارة مجانية.',
    tag: '[ تواصل معنا ]', title: ['تحدّث إلى', 'مستشار'],
    text: 'اتصل بالمقر الرئيسي، أو راسلنا عبر واتساب، أو اترك بياناتك أدناه ليتصل بك أقرب فرع إليك. الاستشارة مجانية وبلغتك.',
    hq: 'المقر الرئيسي', address: 'العنوان', phone: 'الهاتف', whatsapp: 'واتساب', email: 'البريد الإلكتروني', hours: 'ساعات العمل', hoursValue: 'السبت إلى الخميس، 9:00 – 17:30 · الجمعة عطلة', directions: 'افتح في خرائط Google', call: 'اتصل الآن', chat: 'راسلنا عبر واتساب',
    branchesTitle: ['فروعنا', ''], branchesText: 'سبعة عشر مكتباً في تسع دول. اتصل بأقرب فرع إليك، أو اختره في النموذج ليتصل بك مستشار من ذلك المكتب.',
  },
  legal: {
    privacyMeta: 'سياسة الخصوصية | ريتش للهجرة', termsMeta: 'شروط الاستخدام | ريتش للهجرة', privacyTitle: ['سياسة', 'الخصوصية'], termsTitle: ['شروط', 'الاستخدام'], tag: '[ قانوني ]', updated: 'آخر تحديث',
  },
  passport: {
    meta: 'مؤشر جوازات السفر 2026 | قارن 199 جوازاً | ريتش للهجرة', desc: 'كل جوازات السفر مرتّبة بعدد الوجهات التي تفتحها دون تأشيرة مسبقة. اختر جوازك، أضف جوازاً ثانياً، واعرف بالضبط أي الدول سيفتحها لك.',
    tag: '[ مؤشر الجوازات ]', title: ['مؤشر', 'جوازات السفر'],
    text: 'كل جوازات العالم مرتّبة بعدد الوجهات التي تفتحها دون تأشيرة مسبقة: بلا تأشيرة، أو تأشيرة عند الوصول، أو تصريح سفر إلكتروني. اختر جوازك، وأضف جوازاً ثانياً، واعرف بالضبط ما الذي سيتغير.',
    updated: 'تحديث البيانات', source: 'مبني على بيانات عامة لمتطلبات التأشيرات (passportindex.org) عالجتها ريتش. القواعد تتغير كثيراً؛ تأكد قبل السفر.',
    yours: 'جوازك', second: 'الجواز الثاني', rank: 'الترتيب', score: 'الوجهات', vf: 'بلا تأشيرة', voa: 'تأشيرة عند الوصول', eta: 'تصريح إلكتروني', evisa: 'تأشيرة إلكترونية', required: 'تأشيرة مطلوبة',
    adds: 'ما يضيفه الجواز الثاني', addsNone: 'لا يفتح هذا الجواز وجهات لا يفتحها جوازك أصلاً.', combined: 'معاً يفتحان', of: 'من', destinations: 'وجهة',
    newVf: 'تصبح بلا تأشيرة', newVoa: 'تصبح بتأشيرة عند الوصول', newEta: 'تصبح بتصريح إلكتروني',
    program: 'برنامج لدى ريتش', view: 'عرض البرنامج', table: 'كل الجوازات الـ199', search: 'ابحث عن جواز…', noResults: 'لا يوجد جواز مطابق.',
    cta: 'هل يمكن أن يكون أحد هذه الجوازات جوازك؟', ctaBtn: 'قيّم حالتي',
  },
  notFound: { title: 'الصفحة غير موجودة', text: 'الصفحة التي تبحث عنها نُقلت أو لم تعد موجودة.', home: 'العودة إلى الرئيسية', programs: 'تصفّح البرامج' },
};

export const pages: Record<Lang, typeof en> = { en, ar };
