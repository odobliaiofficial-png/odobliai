# Odobli.ai — To'liq Texnik Audit: Xatolar, Xavfsizlik va Dizayn Tahlili

## 📋 Qamrov haqida muhim eslatma

Ushbu to'plamda **8 ta narsa** taqdim etilgan: `bot/config.py`, `bot/main.py`, `bot/update_menu_button.py`, `api/upload.js`, `web/src/types.ts`, `web/src/utils/imageCompressor.ts`, `web/src/components/Lifehacklar.tsx` va `.env.example`.

Loyiha strukturasida qayd etilgan, lekin **ushbu to'plamda yo'q** bo'lgan fayllar (kamida 10+ ta):

| Fayl/papka | Nega muhim |
|---|---|
| `web/src/components/AdminPanel.tsx` | 🔴 Eng yuqori xavfli fayl — admin autentifikatsiyasi shu yerda |
| `web/src/context/AppContext.tsx` | 🔴 Supabase mijozi shu yerda ishga tushirilishi kerak — qaysi kalit (anon/service) ishlatilayotgani shu yerda aniqlanadi |
| `bot/handlers/` (Start, Profile, Premium, Admin) | Admin buyruqlari va premium tasdiqlash logikasi shu yerda |
| `bot/middlewares/` (throttling, ban_check) | `main.py` bularni import qiladi, lekin kodi ko'rinmaydi |
| `bot/services/scheduler.py` | `main.py` import qiladi, lekin loyiha strukturasi diagrammasida umuman qayd etilmagan ham |
| `api/image.js` | R2 rasmlarini qanday xavfsiz qaytarishini bildiradi |
| `web/src/App.tsx`, `main.tsx` | Routing va umumiy holat boshqaruvi |
| `web/src/components/PazandaAI.tsx` | |
| `web/src/utils/transliterate.ts`, `package.json` | Tailwind versiyasini aniqlash uchun ham kerak (pastda izohlangan) |

**Xulosa:** Quyidagi tahlil faqat taqdim etilgan 8 ta narsaga asoslangan. Lekin xotiramda avvalgi xavfsizlik auditida aynan shu loyiha turkumida "hardcoded bot token, bypassable admin auth, missing Supabase RLS" muammolari topilgani bor edi — va bu muammolar odatda **aynan yuqoridagi 🔴 belgili, taqdim etilmagan fayllarda** yashaydi. Shuning uchun eng kritik ikki band shu fayllar haqida "nima tekshirish kerak"ligi bo'yicha aniq yo'l-yo'riq shaklida berildi.

---

## 📊 Umumiy ko'rinish

| Daraja | Soni |
|---|---|
| 🔴 Kritik | 3 |
| 🟡 O'rta | 8 |
| 🟢 Mayda / sayqal | 10 |
| ✅ Yaxshi bajarilgan | 10 |

---

## 🔴 KRITIK MUAMMOLAR

### K1. `Lifehacklar.tsx` — papkani bosganda hech narsa ko'rinmaydi

Komponent `filteredHacks` ro'yxatini hisoblaydi:

```tsx
const filteredHacks = lifehacks.filter(lh => {
  if (lh.holat !== 'nashr') return false;
  if (selectedCat === 'barchasi') return true;
  return lh.kategoriya === selectedCat;
});
```

Lekin butun faylda bu o'zgaruvchi **boshqa hech qayerda ishlatilmaydi**. "INSIDE FOLDER VIEW" qismi esa shundan iborat:

```tsx
) : (
  /* INSIDE FOLDER VIEW */
  <motion.div key="inside-folder" ...>
    <div className="bg-gradient-to-r ...">
      <button onClick={() => setSelectedCat(null)}>
        <ArrowLeft ... /><span>{t("Papkalarga Qaytish")}</span>
      </button>
    </div>
  </motion.div>
)}
```

Ya'ni: foydalanuvchi papkani bosadi → orqaga tugmasidan boshqa **hech qanday tarkib ko'rsatilmaydi**. Bu taxminni tasodifiy emasligini quyidagilar tasdiqlaydi — bularning barchasi import/deklaratsiya qilingan, lekin JSX ichida **birortasi ham ishlatilmagan**:

- `expandedId`, `setExpandedId` (state)
- `selectedLifehackId`, `setSelectedLifehackId` (AppContext'dan olingan)
- `ChevronDown`, `ChevronUp`, `CheckCircle2` (import qilingan ikonalar)
- `filteredHacks` (hisoblangan, render qilinmagan)

Bu — komponent kodi to'plamga qo'shilganda kesilib qolgan (yoki fayl to'liq eksport qilinmagan) degani bo'lishi ehtimoli katta. **Lekin agar bu real production holat bo'lsa — bu ilovadagi eng og'ir funksional xato: "ishlamayotgan tugma" emas, balki butun bir ekran yo'q.** Iltimos, real `Lifehacklar.tsx` faylini to'liq (barcha qatorlari bilan) qayta yuboring — men aniq nima yetishmayotganini spetsifikatsiya bilan pastda (bo'lim 11) tayyorlab qo'ydim, shunga ko'ra to'g'ridan-to'g'ri AI coding vositasiga berish mumkin.

### K2. Admin panel autentifikatsiyasi — tekshirib bo'lmadi, lekin bu aynan avval topilgan muammo turi

`AdminPanel.tsx` va `AppContext.tsx` yo'qligi sababli, admin huquqini kim va qanday tekshirishini ko'ra olmadim. Avvalgi auditda "bypassable admin auth" (chetlab o'tsa bo'ladigan admin tekshiruvi) topilgani inobatga olinsa, bu ikki faylni ayni shu nuqtai nazardan diqqat bilan tekshirib chiqing:

**❌ Xavfli naqsh** (agar shunday bo'lsa — darhol tuzatish kerak):
```tsx
// AdminPanel.tsx ichida — FAQAT client tarafda tekshirish
const isAdmin = telegramUser.id === ADMIN_ID; // client-side qiyoslash
if (isAdmin) {
  await supabase.from('lifehacks').update(...).eq('id', id); // to'g'ridan-to'g'ri Supabase chaqiruvi
}
```
Bu yerda muammo: `ADMIN_ID` qiymati frontend bundle'ida ko'rinadi (DevTools → Sources orqali topiladi), va `isAdmin` tekshiruvi shunchaki brauzerdagi JavaScript o'zgaruvchisi — uni har qanday foydalanuvchi brauzer konsolida burab, admin UI'ni ko'rsatib, xohlagan Supabase so'rovini yuborishi mumkin, agar Supabase RLS (Row Level Security) buni serverda mustaqil ravishda bloklamasa.

**✅ To'g'ri naqsh** — `api/upload.js` faylida allaqachon ishlatilgan usulni admin amallariga ham qo'llash:
1. AdminPanel har qanday yozish amalini (banner o'zgartirish, kontent tahrirlash) `api/admin-*.js` kabi serverless funksiyaga yuboradi.
2. Funksiya `Authorization: tma <initData>` headerini **serverda** HMAC orqali tekshiradi (`upload.js`dagi `isValidTelegramInitData` funksiyasi bilan bir xil).
3. Tasdiqlangan `initData`dan chiqarilgan `user.id` ni `ADMIN_ID` bilan **serverda** solishtiradi.
4. Faqat shundan keyin, serverda saqlanadigan `SUPABASE_SERVICE_KEY` bilan Supabase'ga yozadi.
5. Supabase'da har bir jadval uchun RLS yoqilgan bo'lishi va `anon` role uchun faqat `holat = 'nashr'` bo'lgan qatorlarni **o'qishga** ruxsat berishi, yozishga esa umuman ruxsat bermasligi kerak (yozish faqat service_role orqali, ya'ni faqat backenddan).

Bu bandni **hal qilingan deb hisoblamang** — men buni ko'ra olmadim, faqat qanday tekshirishni ko'rsatyapman.

### K3. Supabase RLS — umumiy tekshiruv ro'yxati

`AppContext.tsx` yo'qligi sababli qaysi Supabase kaliti frontendda ishlatilayotganini ko'ra olmadim. Tezkor tekshiruv:

- [ ] Brauzer DevTools → Network → istalgan Supabase so'rovini oching. `apikey` headerida **faqat `anon` kalit** bo'lishi kerak, `service_role` kaliti emas (agar service_role frontendga chiqib ketgan bo'lsa — bu darhol Supabase dashboard'dan kalitni bekor qilish/rotatsiya qilishni talab qiladigan favqulodda holat).
- [ ] Supabase Dashboard → Authentication → Policies: `lifehacks`, `retseptlar`, `ertaklar`, `banners` kabi har bir jadvalda RLS **yoqilgan** (Enable RLS) bo'lishi kerak.
- [ ] Har bir jadval uchun: `anon` roli faqat `SELECT ... WHERE holat = 'nashr'` qila olishi, `INSERT/UPDATE/DELETE` esa umuman ruxsat etilmasligi kerak.

---

## 🟡 O'RTA DARAJADAGI MUAMMOLAR

### O1. `config.py` — `CARD_NUMBER` noto'g'ri qiymatga bog'langan

```python
config = Config()
...
CARD_NUMBER = config.PAYMENT_CARD   # ❌ bo'lishi kerak: config.CARD_NUMBER
...
PAYMENT_CARD = config.PAYMENT_CARD
```
Modul darajasidagi `CARD_NUMBER` aslida "raqam (turi)" formatidagi `PAYMENT_CARD` qiymatini oladi, sof karta raqamini emas. Kim ushbu faylda `from config import CARD_NUMBER` qilsa, kutilganidan farqli natija oladi. Tuzatish: `CARD_NUMBER = config.CARD_NUMBER`. Umuman, ikkita parallel eksport tizimi (klass atributi + modul darajasidagi nusxa) shu kabi chalkashliklarga sabab bo'ladi — uzoq muddatda hammasini `from config import config` qilib, faqat `config.XXX` orqali murojaat qilishga o'tish tavsiya etiladi.

### O2. `imageCompressor.ts` — xatolik sukut saqlab yutib yuboriladi

```typescript
} catch (err) {}

// Fallback: Return DataURL safely
return { url: dataUrl, storageType: 'dataurl', statusMessage: 'Lokal keshga saqlandi', ... };
```
R2'ga yuklash 401/413/500 yoki tarmoq xatosi bilan barbod bo'lsa, foydalanuvchi (masalan, admin banner/qopqoq rasm yuklayotganda) hech qanday ogohlantirish ko'rmaydi — xabar xuddi hammasi yaxshi kabi eshitiladi ("Lokal keshga saqlandi"). Natijada rasm CDN'da emas, balki faqat vaqtinchalik Data URL sifatida qoladi — sahifa yangilansa yo'qoladi yoki (agar shu holatda Supabase'ga yozilsa) ma'lumotlar bazasini kerak bo'lmagan ulkan matn qatorlari bilan to'ldiradi. Kamida: `console.error(err)` qo'shing va `statusMessage`ni chaqiruvchi komponent aniq ogohlantirish sifatida ko'rsatadigan qilib o'zgartiring (masalan: "⚠️ Bulutga ulanib bo'lmadi, rasm vaqtincha lokal saqlanmoqda").

### O3. `api/upload.js` — xatolik serverda loglanmaydi

```javascript
} catch (err) {
  return res.status(500).json({ error: 'Failed to upload image' });
}
```
Foydalanuvchiga umumiy xabar qaytarish to'g'ri (ichki tafsilotlarni oshkor qilmaslik yaxshi amaliyot), lekin `err` hech qayerda log qilinmaydi. Demak, agar yuklashlar muntazam ravishda barbod bo'la boshlasa, buni Vercel loglaridan sababini bilib bo'lmaydi. `console.error('R2 upload error:', err);`ni qo'shish tavsiya etiladi.

### O4. Webhook konfiguratsiyasi — ishlatilmayotgan "o'lik kod" va konflikt xavfi

`config.py`da `WEBHOOK_HOST`, `WEBHOOK_PATH`, `WEBHOOK_URL` aniqlangan, lekin `main.py` **polling** rejimida ishlaydi (`dp.start_polling(bot)`), webhook hech qayerda ishlatilmaydi. Ikkita muammo:
1. O'lik kod — yoki webhook uchun alohida kirish nuqtasi bor-u, u ham to'plamga kiritilmagan, yoki bu sozlama shunchaki keraksiz.
2. Agar bot avval webhook rejimida ishlagan bo'lsa-yu, keyin polling'ga o'tkazilgan bo'lsa, `main()` boshida `await bot.delete_webhook(drop_pending_updates=True)` chaqirilmagani sababli Telegram tomonidan **"Conflict: can't use getUpdates method while webhook is active"** xatosi kelishi mumkin. Bu qatorni polling boshlashdan oldin qo'shish xavfsiz va tavsiya etiladi.

### O5. Global xatolik ushlagichi yo'q

`Dispatcher`da hech qanday global error handler ro'yxatdan o'tkazilmagan. Har qanday handler ichidagi kutilmagan xatolik (masalan, Supabase vaqtincha ishlamay qolsa) botni chalkashtirib qo'yishi yoki foydalanuvchiga hech qanday javob bermay qolishi mumkin — bu bolalar/oilalar uchun mo'ljallangan ilova uchun ayniqsa yoqimsiz tajriba. aiogram 3'da global xatolik handleri qo'shish tavsiya etiladi, shunda kutilmagan xatoliklar loglanadi va foydalanuvchiga tushunarli xabar ("Nimadir xato ketdi, birozdan keyin urinib ko'ring") ko'rsatiladi.

### O6. Render free-tier + polling — bot "uxlab qolishi" mumkin

Bot polling rejimida ishlaydi va faqat health-check uchun aiohttp serveri ochiladi — bu Render.com'ning bepul Web Service turiga moslashtirilgan klassik naqsh. Lekin muhim jihat: Render 15 daqiqa davomida hech qanday kiruvchi trafik bo'lmagan bepul web-servisni to'xtatib qo'yadi, va u faqat keyingi HTTP so'rovi yoki yangi WebSocket ulanishi kelganda (taxminan bir daqiqada) qayta ishga tushadi. Botning o'zi Telegram'ga tashqariga so'rov yuborayotgani (polling) buni **hisobga olmaydi** — agar hech kim `/health` manzilini tashqi tomondan (masalan, UptimeRobot yoki cron-job.org orqali har 10 daqiqada) so'ramasa, butun konteyner (bot bilan birga) 15 daqiqadan keyin to'xtaydi va bot "offlayn" bo'lib qoladi, toki tasodifan biror HTTP so'rov kelmaguncha. Agar bunday tashqi "ping" xizmati hali sozlanmagan bo'lsa — buni sozlash tavsiya etiladi.

### O7. Ikonalar uchun tashqi, versiyalanmagan CDN'ga bog'liqlik

Barcha kategoriya ikonalari boshqa birovning shaxsiy GitHub repozitoriyasidan (`cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis/...`) to'g'ridan-to'g'ri yuklanadi. `Category3DIcon`dagi `onError` fallback yaxshi himoya (repo o'chib qolsa ham, emoji'ga qaytadi — buni ijobiy tomon sifatida pastda ham qayd etdim), lekin ishlab chiqarish (production) ilovasi uchun boshqa birovning shaxsiy repozitoriyasiga to'liq bog'liq bo'lish beqaror. Tavsiya: bu rasmlarni R2 bucket'ingizga (allaqachon ishlatyapsiz) yoki Vite build ichiga statik asset sifatida ko'chirib qo'yish.

### O8. Ikkita turli `PORT` standart qiymati

`bot/main.py`: `int(os.environ.get("PORT", 10000))` — `bot/config.py`: `int(os.getenv("PORT", "8080"))`. Ikkalasi bir xil environment o'zgaruvchisini o'qiydi, lekin `main.py` `config.PORT`dan foydalanmaydi, o'zi alohida standart qiymat bilan qayta o'qiydi. `PORT` environment'da o'rnatilgan bo'lsa muammo yo'q, lekin o'rnatilmasa ikki xil natija berishi mumkin — bittasiga birlashtirish tavsiya etiladi.

---

## 🟢 MAYDA MUAMMOLAR VA SAYQALLASH MUMKIN BO'LGAN JOYLAR

| # | Topilma | Nega muhim | Tavsiya |
|---|---|---|---|
| M1 | Papka kartalari `<div onClick>` orqali ishlaydi, `<button>` emas | Klaviatura/skrin-rider foydalanuvchilari uchun tugma sifatida tanilmaydi (orqaga tugmasi esa to'g'ri `<button>`) | `role="button" tabIndex={0}` + `onKeyDown` qo'shing, yoki `<button>`ga o'tkazing |
| M2 | 0 ta element bo'lgan papka uchun "bo'sh holat" yo'q | Foydalanuvchi bo'sh papkaga kirib, hech narsa ko'rmasligi mumkin (K1 tuzatilgach ham) | "Bu yerda hali hech narsa yo'q" turidagi xabar + orqaga taklifi |
| M3 | Matn kontrastini tekshirish kerak (`text-white/90`, `text-[#9D4C6C]`) | Kichik, xira matnlar WCAG AA kontrast talabidan pastda bo'lishi mumkin | Rangli fon ustidagi kichik matnlarni kontrast tekshiruvchisidan o'tkazing |
| M4 | `categories` massivi komponent ichida, har render'da qayta yaratiladi | Kichik unumsizlik (9 ta obyekt + tashqi URL'lar har safar qayta hosil bo'ladi) | Komponentdan tashqariga, modul darajasiga chiqaring |
| M5 | `(window as any).Telegram?.WebApp` bir necha joyda takrorlanadi | Tip xavfsizligi yo'qoladi, xatoliklarni compile-time'da ushlab bo'lmaydi | Bitta global `telegram-webapp.d.ts` tip fayli yarating |
| M6 | `SUBSCRIPTION_PRICE_SOM` va `PREMIUM_PRICE` bir xil qiymatning ikki nomi | Kelajakda ikkitasidan faqat bittasi yangilanib, ikkinchisi eskirib qolishi mumkin | Bitta nomga birlashtiring |
| M7 | `w-13 h-13` klassi (Tailwind standart shkalasida "13" yo'q — 12dan keyin 14ga sakraydi) | Agar loyiha Tailwind v3 ishlatsa, bu klass hech qanday CSS bermaydi | `shadow-2xs`/`drop-shadow-xs` kabi klasslar mavjudligi loyihada **Tailwind v4** ishlatilayotganini ko'rsatadi — v4'da spacing shkalasi dinamik hisoblanadi, shuning uchun bu **ehtimol muammo emas**. `package.json` taqdim etilmagani uchun 100% tasdiqlab bo'lmadi — versiyani tekshirib ko'ring |
| M8 | Yuklash progress-indikatori yo'q | 3MB gacha rasm sekin mobil internetda (O'zbekistonda odatiy holat) bir necha soniya olishi mumkin, foydalanuvchi jarayonni ko'rmaydi | Oddiy spinner/progress bar qo'shish tavsiya etiladi |
| M9 | Qayta urinish (retry) logikasi yo'q | Vaqtinchalik tarmoq uzilishi to'g'ridan-to'g'ri "lokal fallback"ga olib boradi | 1 marta avtomatik qayta urinish qo'shish mumkin |
| M10 | `update_menu_button.py` — `bot.session.close()` chaqirilmaydi | Skript darhol tugagani uchun katta muammo emas, lekin toza yopish yaxshi amaliyot | `finally: await bot.session.close()` qo'shing |

---

## ✅ YAXSHI BAJARILGAN JIHATLAR

Audit faqat kamchiliklardan iborat bo'lmasligi kerak — quyidagilar aniq yaxshi qilingan:

1. **`isValidTelegramInitData` (`api/upload.js`)** — bu Telegram Mini App autentifikatsiyasining rasman tavsiya etilgan HMAC-SHA256 algoritmi bo'yicha to'g'ri yozilgan: `timingSafeEqual` bilan doimiy vaqtli solishtirish, uzunlikni oldindan tekshirish, `auth_date` orqali eskirgan ma'lumotni rad etish. Bu naqshni AdminPanel/boshqa API endpointlarga ham izchil qo'llash tavsiya etiladi (K2'ga qarang).
2. Fayl nomlarini tozalash (`safeName.replace(/[^a-zA-Z0-9_-]/g, '_')`) — path traversal/in'ektsiyadan himoya.
3. Rasm turi va hajmini oq ro'yxat (whitelist) asosida tekshirish (faqat jpeg/png/webp, 1 bayt – 3MB).
4. Xatolik javoblarida ichki tafsilotlar oshkor qilinmaydi (generic 500 xabari).
5. `Category3DIcon`dagi `onError` fallback — tashqi CDN ishlamay qolsa ham, UI buzilmay, emoji'ga muloyim o'tadi.
6. Telegram `BackButton` va brauzer `popstate`ni ikkalasini ham to'g'ri, tozalash (`cleanup`) bilan boshqarish — Mini App muhitining nozik jihatlarini yaxshi tushunish ko'rsatkichi.
7. Render'ga moslashtirilgan health-check server naqshi — hosting cheklovi uchun to'g'ri arxitektura tanlovi.
8. Rasmni yuklashdan oldin klient tarafida siqish (`compressImage`) — cheklangan mobil internetdagi foydalanuvchilar uchun oqilona.
9. `t()` tarjima funksiyasining izchil qo'llanilishi — ko'p tilli asos yaxshi qurilgan.
10. TypeScript interfeyslarining alohida faylga chiqarilgani (`types.ts`) — kodning o'sishi bilan foydali bo'ladigan yaxshi amaliyot.

---

## 🎨 Dizayn tizimi: tokenlar tahlili

| Kategoriya | Holat |
|---|---|
| Ranglar | `#BE185D`, `#DB2777`, `#E11D48` qatʼiy (arbitrary) hex qiymatlar sifatida takror-takror ishlatilgan — bular Tailwind'ning standart `pink-700`/`pink-600`/`rose-600` ranglariga juda yaqin (ehtimol aynan mos). Fayl boshqa joylarda `bg-pink-100`, `border-pink-200` kabi nomlangan klasslarni ham ishlatadi — shuning uchun `from-[#BE185D]` o'rniga `from-pink-700` yozish izchillikni oshiradi va Tailwind konfiguratsiyasidan markazlashgan boshqarishga imkon beradi |
| Maxsus brend ranglari | `#2E121D`, `#9D4C6C` — bular haqiqiy custom ranglarga o'xshaydi (Tailwind standartida yo'q). Agar boshqa komponentlarda ham takrorlansa, `tailwind.config`/CSS `@theme`da nomlangan token sifatida belgilash tavsiya etiladi |
| Komponent klasslar | `card-pink`, `badge-gold` kabi nomlangan klasslar allaqachon ishlatilgan — bu yaxshi naqsh, uni qolgan hardcoded joylarga ham kengaytirish mumkin |
| Interaktiv elementlar izchilligi | Bir xil "bosiladigan karta" tipidagi elementlarning ba'zilari `<button>`, ba'zilari `<div onClick>` — M1'ga qarang |

---

## ✍️ UX Copy topilmalari

**1. Yashirin xatolik xabari** (`imageCompressor.ts`) — hozirgi holat: muvaffaqiyat ham, xatolik ham bir xil "Lokal keshga saqlandi" degan neytral xabar bilan yakunlanadi. UX copy tamoyili "nima bo'ldi + nega + qanday tuzatish" bo'yicha, bu holatda foydalanuvchiga muammo borligi umuman yetkazilmaydi. Tavsiya etilgan matn: **"⚠️ Bulutli saqlashga ulanib bo'lmadi. Rasm vaqtincha shu qurilmada saqlanmoqda — internetni tekshirib qayta urinib ko'ring."**

**2. Bo'sh papka holati** (hozircha yo'q, K1/M2) — "nima bu + nega bo'sh + qanday boshlash" tuzilishi bo'yicha tavsiya: **"Bu papkada hali maslahatlar yo'q. Tez orada qo'shiladi! 🌱"** (admin uchun alohida: "Hali kontent yo'q — Admin panelidan qo'shing").

---

## 🗺️ TUZATISH REJASI (ustuvorlik tartibida)

- [ ] **1-qadam:** Real, to'liq `Lifehacklar.tsx` faylini qayta yuboring (K1) — bu eng katta foydalanuvchi ta'siriga ega
- [ ] **2-qadam:** `AdminPanel.tsx` va `AppContext.tsx` fayllarini K2/K3 nuqtai nazaridan qo'lda tekshiring (yoki menga yuboring) — ayniqsa Supabase kaliti va admin tekshiruvi qayerda amalga oshirilishi
- [ ] **3-qadam:** Supabase Dashboard'da RLS policy'larini K3 checklist bo'yicha tasdiqlang
- [ ] **4-qadam:** `config.py`dagi `CARD_NUMBER` bug'ini tuzating (O1) — 1 qatorlik o'zgarish
- [ ] **5-qadam:** `imageCompressor.ts`dagi jim xatolikni ogohlantirishga aylantiring (O2)
- [ ] **6-qadam:** `api/upload.js`ga `console.error` qo'shing (O3)
- [ ] **7-qadam:** Render'da tashqi ping (UptimeRobot/cron-job.org) sozlanganini tasdiqlang (O6)
- [ ] **8-qadam:** `bot.delete_webhook()` xavfsizlik chaqiruvini qo'shing, ishlatilmayotgan webhook sozlamalarini tozalang (O4)
- [ ] **9-qadam:** Global xatolik handleri qo'shing (O5)
- [ ] **10-qadam:** Qolgan 🟢 mayda va dizayn-tizim tavsiyalarini qulay vaqtda bosqichma-bosqich qo'llang

---

## 🧩 Qo'shimcha: "Ichki papka" ko'rinishi uchun tayyor spetsifikatsiya

Buni to'g'ridan-to'g'ri AI coding vositangizga berishingiz mumkin — mavjud state/import'lardan foydalanadi, yangi dependency talab qilmaydi.

**Kerakli holatlar:**

| Holat | Ko'rsatiladigan narsa |
|---|---|
| Ro'yxat (yopiq karta) | `sarlavha`, kichik ikon/rasm, `ChevronDown` |
| Kengaytirilgan (`expandedId === lh.id`) | `maslahat` matni, `bosqichlar` (mavjud bo'lsa raqamlangan ro'yxat), `foydali_lahzalar` (`CheckCircle2` bilan), `rasm_url` (mavjud bo'lsa) |
| Bo'sh (`filteredHacks.length === 0`) | "Bu yerda hali maslahatlar yo'q" xabari |

**Boshlang'ich JSX skeleton:**

```tsx
{filteredHacks.length === 0 ? (
  <div className="text-center py-10 text-[#9D4C6C]">
    <p className="text-sm font-bold">{t("Bu papkada hali maslahatlar yo'q")}</p>
  </div>
) : (
  <div className="space-y-3">
    {filteredHacks.map(lh => {
      const isOpen = expandedId === lh.id;
      return (
        <div key={lh.id} className="card-pink rounded-2xl border border-pink-200/90 overflow-hidden">
          <button
            onClick={() => setExpandedId(isOpen ? null : lh.id)}
            className="w-full flex items-center justify-between p-3.5 text-left"
          >
            <h4 className="font-extrabold text-[#2E121D] text-sm">{t(lh.sarlavha)}</h4>
            {isOpen ? <ChevronUp className="w-4 h-4 text-[#DB2777]" /> : <ChevronDown className="w-4 h-4 text-[#DB2777]" />}
          </button>

          {isOpen && (
            <div className="px-3.5 pb-3.5 space-y-2">
              {lh.rasm_url && (
                <img src={lh.rasm_url} alt={lh.sarlavha} className="w-full rounded-xl object-cover" />
              )}
              <p className="text-xs text-[#9D4C6C]">{t(lh.maslahat)}</p>
              {lh.foydali_lahzalar?.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DB2777] flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-[#2E121D]">{t(point)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>
)}
```

Eslatma: `selectedLifehackId`/`setSelectedLifehackId` context'dan kelayotganiga qaraganda, ehtimol alohida to'liq ekranli "batafsil" ko'rinish ham rejalashtirilgan bo'lgan — agar shunday bo'lsa, yuqoridagi akkordion o'rniga (yoki qo'shimcha ravishda) karta bosilganda `setSelectedLifehackId(lh.id)` chaqirib, alohida detail komponentga o'tish kerak bo'lishi mumkin. Bu ikkovidan qaysi biri mo'ljallangan ekanini faqat `AppContext.tsx`/`App.tsx` ko'rsatib beradi.

---

*Eslatma: `/design:user-research` va `/design:research-synthesis` bu audit uchun qo'llanilmadi — ular intervyu/so'rovnoma kabi tayyor tadqiqot ma'lumotlarini talab qiladi, bu yerda esa manba faqat kod edi.*
