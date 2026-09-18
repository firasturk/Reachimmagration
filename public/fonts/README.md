# الخطوط

العناوين العربية بتستخدم **GE Dinar Two** (خط تجاري مرخّص للعميل). الملف الموجود: الوزن Medium فقط
(`GEDinarTwo-Medium.woff2` و `.woff`، محوّلين من OTF العميل بـ fontTools). الـ `@font-face` بأول `src/styles/global.css`
بيغطي كل الأوزان 300–800 بنفس الملف عشان ما يعمل المتصفح bold مصطنع.

إذا وصل وزن Bold أو Light لاحقاً: حوّله لـ WOFF2 (`python3 -c "from fontTools.ttLib import TTFont; f=TTFont('X.otf'); f.flavor='woff2'; f.save('X.woff2')"`)
وأضف `@font-face` ثاني بوزنه، وضيّق نطاق الوزن للملف الحالي.
