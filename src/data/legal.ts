// Privacy policy and terms of use, both languages. Plain sections: heading + paragraphs. Dated so the page can print it.
import type { Lang } from '../i18n/ui';
export interface LegalSection { h: string; p: string[] }
export const legalUpdated = '2026-09-18';

const privacyEn: LegalSection[] = [
  { h: 'Who we are', p: ['Reach Immigration (“Reach”, “we”) is an investment-migration consultancy with its head office at 14 King Faisal Bin Abdulaziz Street, Umm Uthaina, Amman, Jordan, and branches in Iraq, Egypt, Saudi Arabia, Qatar, the United Arab Emirates, Kuwait, Turkey and Cyprus. This policy explains what personal data we collect through reachimmigration.com and how we use it.'] },
  { h: 'What we collect', p: ['When you request a consultation we ask for your name, mobile number, email address, nationality, preferred branch and the goal, destination and budget range you tell us about. If you subscribe to updates we keep your email and language preference. Our servers and analytics tools also record technical data such as your IP address, browser, device type and the pages you visit.', 'We do not ask for passport copies, financial statements or other application documents through this website. Those are collected only after you engage us, through secure channels agreed with your consultant.'] },
  { h: 'Why we use it', p: ['We use your details to call you back, prepare your free assessment, connect you with the branch you chose, and, if you agreed, send you program updates and offers. Technical data helps us keep the site secure and understand which pages are useful. The legal basis is your request for our services, your consent for marketing, and our legitimate interest in running the site.'] },
  { h: 'Who sees it', p: ['Your enquiry is stored in our customer-relationship system and is seen by consultants in the branch handling your case. We share data with service providers that host the site and the CRM, and with government authorities only when you instruct us to file an application. We never sell personal data.'] },
  { h: 'How long we keep it', p: ['Enquiries are kept for up to three years from your last contact with us so that we can follow up, unless you ask us to delete them earlier. Client files are kept as long as professional and legal obligations require.'] },
  { h: 'Your rights', p: ['You can ask us at any time to see, correct or delete the personal data we hold about you, to stop marketing messages, or to object to a particular use. Write to info@reachimmigration.com and we answer within thirty days. Every marketing email also carries an unsubscribe link.'] },
  { h: 'Cookies and analytics', p: ['The site uses only the cookies needed for it to work and privacy-respecting analytics that do not build profiles of visitors. Embedded services such as Google Maps or YouTube may set their own cookies when you use them.'] },
  { h: 'Changes', p: ['We update this policy when our practices or the law change. The date at the top shows the current version.'] },
];
const privacyAr: LegalSection[] = [
  { h: 'من نحن', p: ['ريتش للهجرة («ريتش»، «نحن») شركة استشارات في الهجرة الاستثمارية مقرها الرئيسي في 14 شارع الملك فيصل بن عبد العزيز، أم أذينة، عمّان، الأردن، ولها فروع في العراق ومصر والسعودية وقطر والإمارات والكويت وتركيا وقبرص. توضّح هذه السياسة البيانات الشخصية التي نجمعها عبر reachimmigration.com وكيف نستخدمها.'] },
  { h: 'ما الذي نجمعه', p: ['عند طلب الاستشارة نسألك عن اسمك ورقم جوالك وبريدك الإلكتروني وجنسيتك والفرع المفضّل، وعن الهدف والوجهة ونطاق الميزانية التي تخبرنا بها. وإذا اشتركت في المستجدات نحتفظ ببريدك ولغتك المفضّلة. كما تسجّل خوادمنا وأدوات التحليل بيانات تقنية مثل عنوان IP والمتصفح ونوع الجهاز والصفحات التي تزورها.', 'لا نطلب عبر هذا الموقع صور جوازات أو كشوفاً مالية أو غيرها من وثائق الطلب. تُجمع تلك الوثائق فقط بعد التعاقد معنا، عبر قنوات آمنة يُتفق عليها مع مستشارك.'] },
  { h: 'لماذا نستخدمها', p: ['نستخدم بياناتك للاتصال بك، وإعداد تقييمك المجاني، وربطك بالفرع الذي اخترته، وإرسال مستجدات البرامج والعروض إذا وافقت على ذلك. وتساعدنا البيانات التقنية على تأمين الموقع ومعرفة الصفحات المفيدة. والأساس القانوني هو طلبك لخدماتنا، وموافقتك على الرسائل التسويقية، ومصلحتنا المشروعة في تشغيل الموقع.'] },
  { h: 'من يطّلع عليها', p: ['يُحفظ طلبك في نظام إدارة علاقات العملاء لدينا ويطّلع عليه المستشارون في الفرع الذي يتولى حالتك. نشارك البيانات مع مزوّدي الخدمات الذين يستضيفون الموقع والنظام، ومع الجهات الحكومية فقط عندما تكلّفنا بتقديم طلب. لا نبيع البيانات الشخصية أبداً.'] },
  { h: 'مدة الاحتفاظ', p: ['نحتفظ بالطلبات حتى ثلاث سنوات من آخر تواصل معك لنتمكن من المتابعة، ما لم تطلب حذفها قبل ذلك. وتُحفظ ملفات العملاء ما دامت الالتزامات المهنية والقانونية تقتضي ذلك.'] },
  { h: 'حقوقك', p: ['يمكنك في أي وقت أن تطلب الاطلاع على بياناتك الشخصية لدينا أو تصحيحها أو حذفها، أو إيقاف الرسائل التسويقية، أو الاعتراض على استخدام معيّن. راسلنا على info@reachimmigration.com ونجيبك خلال ثلاثين يوماً. وتحمل كل رسالة تسويقية رابطاً لإلغاء الاشتراك.'] },
  { h: 'ملفات تعريف الارتباط والتحليلات', p: ['يستخدم الموقع فقط ملفات تعريف الارتباط اللازمة لعمله وأدوات تحليل تحترم الخصوصية ولا تبني ملفات تعريف للزوار. وقد تضع الخدمات المضمّنة مثل خرائط Google أو YouTube ملفاتها الخاصة عند استخدامها.'] },
  { h: 'التغييرات', p: ['نحدّث هذه السياسة عند تغيّر ممارساتنا أو القانون. ويُظهر التاريخ في أعلى الصفحة النسخة الحالية.'] },
];
const termsEn: LegalSection[] = [
  { h: 'Using this site', p: ['reachimmigration.com is published by Reach Immigration to describe the citizenship and residency programs we advise on and to let you request a consultation. By using the site you accept these terms.'] },
  { h: 'Information, not advice', p: ['Program descriptions, amounts, fees and timelines on this site are general information, correct to the best of our knowledge on the date shown on each page. Governments change their rules without notice. Nothing on the site is legal, tax or investment advice, and no program is offered or sold through it. Your rights and our obligations are set out only in the written engagement agreement you sign with Reach.'] },
  { h: 'No guarantee of outcome', p: ['Every application is decided by the government concerned. Reach cannot guarantee approval, processing times or the return on any investment, and figures quoted for funds, property or bonds are not a promise of performance.'] },
  { h: 'Your submissions', p: ['When you send us a consultation request you confirm the details are accurate and that you are entitled to share them. We handle them as described in our privacy policy.'] },
  { h: 'Intellectual property', p: ['Text, design, photography and the Reach name and logo belong to Reach Immigration or its licensors. You may read and share pages for personal use; any other reproduction needs our written permission.'] },
  { h: 'Third-party links', p: ['Links to government websites and other services are provided for convenience. We are not responsible for their content or availability.'] },
  { h: 'Liability', p: ['To the extent permitted by law, Reach is not liable for loss arising from reliance on the site’s content or from its unavailability. This does not limit liability that cannot be excluded under applicable law.'] },
  { h: 'Governing law', p: ['These terms are governed by the laws of the Hashemite Kingdom of Jordan, and the courts of Amman have jurisdiction over any dispute about them.'] },
];
const termsAr: LegalSection[] = [
  { h: 'استخدام الموقع', p: ['تنشر ريتش للهجرة موقع reachimmigration.com للتعريف ببرامج الجنسية والإقامة التي تقدّم الاستشارة فيها ولتمكينك من طلب استشارة. وباستخدامك الموقع فإنك تقبل هذه الشروط.'] },
  { h: 'معلومات لا استشارة', p: ['أوصاف البرامج والمبالغ والرسوم والمدد الواردة في الموقع معلومات عامة، صحيحة حسب علمنا في التاريخ المبيّن في كل صفحة. وتغيّر الحكومات قواعدها دون إشعار. ولا شيء في الموقع يُعدّ استشارة قانونية أو ضريبية أو استثمارية، ولا يُعرض أو يُباع أي برنامج من خلاله. وتُحدَّد حقوقك والتزاماتنا فقط في اتفاقية التعاقد المكتوبة التي توقّعها مع ريتش.'] },
  { h: 'لا ضمان للنتيجة', p: ['تبتّ في كل طلب الحكومة المعنية. ولا تستطيع ريتش ضمان الموافقة أو مدد المعالجة أو عائد أي استثمار، والأرقام المذكورة للصناديق أو العقارات أو السندات ليست وعداً بالأداء.'] },
  { h: 'ما ترسله إلينا', p: ['عند إرسال طلب استشارة تؤكد أن البيانات دقيقة وأن لك الحق في مشاركتها. ونتعامل معها كما هو موضح في سياسة الخصوصية.'] },
  { h: 'الملكية الفكرية', p: ['النصوص والتصميم والصور واسم ريتش وشعارها ملك لريتش للهجرة أو المرخّصين لها. يمكنك قراءة الصفحات ومشاركتها للاستخدام الشخصي، وأي استنساخ آخر يحتاج إلى إذننا الكتابي.'] },
  { h: 'روابط الأطراف الأخرى', p: ['روابط المواقع الحكومية والخدمات الأخرى مقدَّمة للتسهيل. ولسنا مسؤولين عن محتواها أو توافرها.'] },
  { h: 'المسؤولية', p: ['في الحدود التي يسمح بها القانون، لا تتحمل ريتش المسؤولية عن خسارة ناتجة عن الاعتماد على محتوى الموقع أو عن عدم توافره. ولا يحدّ ذلك من مسؤولية لا يمكن استبعادها بموجب القانون المعمول به.'] },
  { h: 'القانون الواجب التطبيق', p: ['تخضع هذه الشروط لقوانين المملكة الأردنية الهاشمية، وتختص محاكم عمّان بأي نزاع بشأنها.'] },
];

export const legal: Record<'privacy' | 'terms', Record<Lang, LegalSection[]>> = {
  privacy: { en: privacyEn, ar: privacyAr },
  terms: { en: termsEn, ar: termsAr },
};
