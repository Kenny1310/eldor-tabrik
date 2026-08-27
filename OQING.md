# Eldor Isarov — tug'ilgan kun sayti

27-avgust 1987. Sof HTML/CSS/JS, hech qanday kutubxona yo'q.

## Kirish qanday ishlaydi

1. `video/kitob.mp4` — kamera kitobga yaqinlashadi (6 s, ovozsiz boshlanadi,
   chap yuqorida "Ovoz" tugmasi bor)
2. Video tugagach kadr qorayib loyqalanadi va "tuq" ovozi chiqadi —
   kitob yopildi. Yopilish harakati ko'rsatilmaydi, ko'z uni o'zi to'ldiradi.
3. `img/cover.jpg` — yopiq muqova. Ustidagi `1987 / Eldor / Isarov` yozuvini
   AI emas, saytning o'zi chizadi (apostroflar buzilmasligi uchun).
4. "Oching" bosiladi → sayt ochiladi va musiqa OVOZ BILAN yonadi.
   Ovoz aynan shu bosish tufayli mumkin bo'ladi — brauzerlar bosishsiz
   tovushga ruxsat bermaydi.

Ikkinchi marta kirilganda video ko'rsatilmaydi, to'g'ridan muqova chiqadi.

## Nimani qayerdan o'zgartirasiz

| Nima | Qayerda |
|---|---|
| Ism, familiya, sana, so'z boshi | `js/main.js` — eng yuqoridagi `CONFIG` |
| Suratlar tartibi va izohlari | `js/main.js` — `PHOTOS` ro'yxati |
| Muqovadagi yozuv | `index.html` — `.cover__plate` ichida |
| Kirish videosi | `video/kitob.mp4` ni almashtiring |
| Yopiq muqova | `img/cover.jpg` ni almashtiring |
| Fon musiqasi | `audio/fon.m4a` ni almashtiring |

Muqovani almashtirsangiz, yozuvning joyi `css/style.css` dagi
`.cover__plate` ning `left/top/width/height` foizlari bilan rostlanadi —
ular muqovadagi bo'sh taxtachaning o'rniga qo'yilgan.

## Netlify'ga qo'yish

1. Yangi sayt yarating, shu papkani tashlang
2. **Environment variables** ga ikkitasini qo'shing — tilaklar
   Telegram'ga shular orqali keladi:
   - `TELEGRAM_BOT_TOKEN` — @BotFather bergan token
   - `TELEGRAM_CHAT_ID` — xabar keladigan chat
   Bu qiymatlar hech qachon brauzerga tushmaydi, faqat serverda turadi.
3. **Sayt manzili ma'lum bo'lgach `index.html` dagi uchta manzilni
   yangilang** — `og:url`, `og:image`, `twitter:image`. Hozir ular
   `https://eldor-tabrik.netlify.app/` deb turibdi. Yangilanmasa
   Telegramdagi havola kartochkasi rasmsiz chiqadi.

## Sinash

```
python -m http.server 5180
```

Telefonda, Telegram ichidagi brauzerda ham albatta sinab ko'ring —
video va ovoz o'sha yerda injiqroq.
