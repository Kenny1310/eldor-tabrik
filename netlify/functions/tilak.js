/* =========================================================
   Tilaklarni Telegram'ga yuboruvchi funksiya.

   Bot tokeni SHU YERDA — serverda — turadi va hech qachon
   brauzerga tushmaydi. Qiymatlar Netlify panelidagi
   "Environment variables" bo'limidan olinadi:

     TELEGRAM_BOT_TOKEN   — @BotFather bergan token
     TELEGRAM_CHAT_ID     — xabar keladigan chat (siz yoki guruh)

   Tokenni hech qachon kod ichiga yozmang va git'ga qo'shmang.
   ========================================================= */

const LIMIT = { ismMin: 2, ismMax: 40, matnMin: 3, matnMax: 400 };

/* Telegram HTML rejimi uchun xavfli belgilarni to'sib qo'yamiz */
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const javob = (code, data) => ({
  statusCode: code,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return javob(405, { ok: false, xato: "Faqat POST" });
  }

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT  = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT) {
    console.error("TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan");
    return javob(500, { ok: false, xato: "Server sozlanmagan" });
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return javob(400, { ok: false, xato: "Noto'g'ri so'rov" });
  }

  // Robotlar uchun yashirin maydon. To'ldirilgan bo'lsa — bu bot.
  // Unga "hammasi joyida" deb javob qaytaramiz, lekin hech narsa yubormaymiz.
  if (data.website) return javob(200, { ok: true });

  const ism  = String(data.ism  || "").trim();
  const matn = String(data.matn || "").trim();

  if (ism.length  < LIMIT.ismMin  || ism.length  > LIMIT.ismMax ||
      matn.length < LIMIT.matnMin || matn.length > LIMIT.matnMax) {
    return javob(400, { ok: false, xato: "Ism yoki matn o'lchami noto'g'ri" });
  }

  const xabar =
    `🎉 <b>Yangi tilak</b>\n\n` +
    `👤 ${esc(ism)}\n\n` +
    `${esc(matn)}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT,
        text: xabar,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const matnJavob = await res.text();
      console.error("Telegram javobi:", res.status, matnJavob);
      return javob(502, { ok: false, xato: "Telegram qabul qilmadi" });
    }

    return javob(200, { ok: true });
  } catch (e) {
    console.error("Yuborishda xato:", e);
    return javob(502, { ok: false, xato: "Ulanib bo'lmadi" });
  }
};
