# الخطوط

العناوين العربية بتستخدم **GE Dinar Two** (خط تجاري من GE Fonts / Boutros، مش على Google Fonts).
حط ملفات الخط المرخّصة هون بهالأسماء بالضبط:

- `GEDinarTwo-Light.woff2` (و `.woff` اختياري)
- `GEDinarTwo-Medium.woff2`
- `GEDinarTwo-Bold.woff2`

الـ `@font-face` جاهز بأول `src/styles/global.css`. لحد ما تنحط الملفات، المتصفح بيرجع تلقائياً لخط El Messiri المرفق مع الموقع.
تحويل TTF/OTF إلى WOFF2: `npx fonttools`… أو أي أداة مثل https://github.com/google/woff2 (`woff2_compress GEDinarTwo-Medium.ttf`).
