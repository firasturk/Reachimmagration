import type { ProgramContent } from './types';

export const portugal: ProgramContent = {
  updated: 'September 2026',
  en: {
    tagline: 'European residency for the whole family, with only seven days a year in the country.',
    intro: [
      'Portugal’s Golden Visa is the residency-by-investment programme most of our clients ask about first. It gives an investor and their family the right to live, work and study in Portugal, free movement across the Schengen area, and a route to permanent residency or citizenship after five years.',
      'Since the property route closed in 2023 the programme runs mainly through regulated investment funds and cultural donations. The presence requirement is light: an average of seven days a year is enough to keep the residency alive and count towards citizenship.',
    ],
    why: [
      { t: 'Path to an EU passport', p: 'Apply for citizenship after five years of residency while living most of the year elsewhere.' },
      { t: 'Seven days a year', p: 'No need to relocate; a short annual stay keeps the residency valid.' },
      { t: 'Whole family included', p: 'Spouse, dependent children and dependent parents join the same application.' },
      { t: 'Schengen access', p: 'Visa-free movement across 29 European countries once the residence card is issued.' },
      { t: 'Regulated investments', p: 'Funds supervised by the Portuguese securities regulator, with a defined exit after the holding period.' },
    ],
    options: [
      { t: 'Investment fund', from: 'EUR 500,000', p: 'Units in a qualified Portuguese venture-capital or private-equity fund, held for at least five years.' },
      { t: 'Cultural or scientific donation', from: 'EUR 250,000', p: 'A contribution to approved arts, heritage or research projects; reduced to EUR 200,000 in low-density areas.' },
      { t: 'Company and jobs', from: 'EUR 500,000', p: 'Capital into a Portuguese company that creates or keeps at least five permanent jobs.' },
    ],
    process: [
      'A consultant confirms your eligibility and the route that fits your budget and goals.',
      'You obtain a Portuguese tax number and open a local bank account, both handled remotely with a power of attorney.',
      'The investment is completed and its proof collected: fund subscription, donation receipt or company registration.',
      'The application is filed online with AIMA together with the family’s documents and clean-record certificates.',
      'Biometrics are taken in Portugal at the appointment we schedule for you.',
      'The residence cards are issued, renewed at the second year and every three years after that.',
    ],
    family: 'Spouse or partner, children under 18, dependent children in full-time education, and dependent parents of either spouse can all be included in one application.',
    facts: [
      { l: 'Route', v: 'Residency by investment' },
      { l: 'Minimum investment', v: 'EUR 250,000 donation or EUR 500,000 fund' },
      { l: 'Time to residency', v: 'Around 12–18 months to the first card, depending on AIMA queues' },
      { l: 'Presence required', v: 'Average of 7 days a year' },
      { l: 'Citizenship', v: 'Eligible after 5 years of residency, with basic Portuguese (A2)' },
      { l: 'Travel', v: 'Schengen area, visa-free' },
      { l: 'Dual citizenship', v: 'Allowed' },
    ],
    faq: [
      { q: 'Can I still buy property to qualify?', a: 'No. Real estate has not qualified since October 2023. Funds and donations are now the main routes, and we can pair the residency with a separate property purchase if you want a home in Portugal.' },
      { q: 'Do I have to move to Portugal?', a: 'No. Seven days a year on average is enough to keep the residency and to count the years towards citizenship.' },
      { q: 'When can I apply for citizenship?', a: 'After five years of legal residency, counted from the date your application was accepted, and with an A2-level Portuguese test.' },
      { q: 'Is the fund investment guaranteed?', a: 'No investment is guaranteed. Funds are regulated by the CMVM and we only work with managers whose strategy, track record and exit terms we have reviewed.' },
    ],
  },
  ar: {
    tagline: 'إقامة أوروبية للعائلة كلها مقابل سبعة أيام فقط في السنة داخل البلد.',
    intro: [
      'التأشيرة الذهبية البرتغالية هي برنامج الإقامة عن طريق الاستثمار الذي يسأل عنه معظم عملائنا أولاً. تمنح المستثمر وعائلته حق العيش والعمل والدراسة في البرتغال، وحرية التنقل في منطقة شنغن، وطريقاً إلى الإقامة الدائمة أو الجنسية بعد خمس سنوات.',
      'منذ إغلاق مسار العقارات في عام 2023 يعمل البرنامج أساساً عبر صناديق الاستثمار المرخّصة والتبرعات الثقافية. وشرط الحضور خفيف: يكفي معدل سبعة أيام في السنة للحفاظ على الإقامة واحتسابها في طريق الجنسية.',
    ],
    why: [
      { t: 'طريق إلى جواز أوروبي', p: 'يمكنك التقدم للجنسية بعد خمس سنوات من الإقامة وأنت تعيش معظم السنة في مكان آخر.' },
      { t: 'سبعة أيام في السنة', p: 'لا حاجة للانتقال؛ إقامة قصيرة سنوياً تبقي الإقامة سارية.' },
      { t: 'العائلة كلها معك', p: 'الزوج أو الزوجة والأبناء المعالون والوالدان المعالون في الطلب نفسه.' },
      { t: 'دخول شنغن', p: 'تنقّل بلا تأشيرة في 29 دولة أوروبية فور صدور بطاقة الإقامة.' },
      { t: 'استثمارات مرخّصة', p: 'صناديق تشرف عليها هيئة الأوراق المالية البرتغالية، مع خروج محدد بعد فترة الاحتفاظ.' },
    ],
    options: [
      { t: 'صندوق استثماري', from: '500,000 يورو', p: 'وحدات في صندوق برتغالي مؤهل لرأس المال المخاطر أو الملكية الخاصة، يُحتفظ بها خمس سنوات على الأقل.' },
      { t: 'تبرع ثقافي أو علمي', from: '250,000 يورو', p: 'مساهمة في مشاريع معتمدة للفنون أو التراث أو البحث العلمي؛ تنخفض إلى 200,000 يورو في المناطق منخفضة الكثافة.' },
      { t: 'شركة ووظائف', from: '500,000 يورو', p: 'رأس مال في شركة برتغالية تُنشئ أو تحافظ على خمس وظائف دائمة على الأقل.' },
    ],
    process: [
      'يؤكد المستشار أهليتك ويحدد المسار الذي يناسب ميزانيتك وأهدافك.',
      'تحصل على رقم ضريبي برتغالي وتفتح حساباً مصرفياً محلياً، وكلاهما يتم عن بُعد بوكالة قانونية.',
      'يُنفَّذ الاستثمار وتُجمع إثباتاته: الاشتراك في الصندوق أو إيصال التبرع أو تسجيل الشركة.',
      'يُقدَّم الطلب إلكترونياً إلى هيئة AIMA مع وثائق العائلة وشهادات حسن السيرة والسلوك.',
      'تُؤخذ البيانات الحيوية في البرتغال في الموعد الذي نحجزه لك.',
      'تصدر بطاقات الإقامة، وتُجدَّد في السنة الثانية ثم كل ثلاث سنوات.',
    ],
    family: 'يمكن ضم الزوج أو الزوجة، والأبناء دون 18 عاماً، والأبناء المعالين المنتظمين في الدراسة، والوالدين المعالين لأيٍّ من الزوجين في طلب واحد.',
    facts: [
      { l: 'المسار', v: 'الإقامة عن طريق الاستثمار' },
      { l: 'الحد الأدنى للاستثمار', v: 'تبرع 250,000 يورو أو صندوق 500,000 يورو' },
      { l: 'مدة الحصول على الإقامة', v: 'نحو 12 إلى 18 شهراً حتى البطاقة الأولى بحسب طوابير AIMA' },
      { l: 'الحضور المطلوب', v: 'معدل 7 أيام في السنة' },
      { l: 'الجنسية', v: 'بعد 5 سنوات من الإقامة مع مستوى A2 في البرتغالية' },
      { l: 'السفر', v: 'منطقة شنغن بلا تأشيرة' },
      { l: 'ازدواج الجنسية', v: 'مسموح' },
    ],
    faq: [
      { q: 'هل ما زال شراء عقار يؤهلني للبرنامج؟', a: 'لا. لم يعد العقار مؤهلاً منذ أكتوبر 2023. الصناديق والتبرعات هي المسارات الرئيسية الآن، ويمكننا الجمع بين الإقامة وشراء عقار منفصل إن رغبت في منزل في البرتغال.' },
      { q: 'هل يجب أن أنتقل إلى البرتغال؟', a: 'لا. يكفي معدل سبعة أيام في السنة للحفاظ على الإقامة واحتساب السنوات في طريق الجنسية.' },
      { q: 'متى يمكنني التقدم للجنسية؟', a: 'بعد خمس سنوات من الإقامة القانونية، تُحتسب من تاريخ قبول طلبك، مع اختبار لغة برتغالية بمستوى A2.' },
      { q: 'هل الاستثمار في الصندوق مضمون؟', a: 'لا يوجد استثمار مضمون. الصناديق مرخّصة من هيئة CMVM، ونعمل فقط مع مديرين راجعنا استراتيجيتهم وسجلهم وشروط الخروج لديهم.' },
    ],
  },
};
