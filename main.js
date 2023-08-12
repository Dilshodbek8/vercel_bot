const { default: axios } = require("axios");
const { Telegraf } = require("telegraf");

const bot = new Telegraf("6341102929:AAHpLie_BjgjaulX9PWPsbr_k_cJ-BSLQW0");

bot.start((ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `Assalomu alaykum ${ctx.update.message.from.first_name} Namoz vaqtlariga xush kelibsiz `,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Bugun", callback_data: "bugun" }],
          [
            { text: "Hafta", callback_data: "hafta" },
            { text: "Oy", callback_data: "oy" },
          ],
        ],
      },
    }
  );
});
let today;
getTodayTime();

async function getTodayTime() {
  try {
    let res = await axios(
      "https://islomapi.uz/api/present/day?region=Toshkent"
    );
    today = res.data;
  } catch (err) {
    console.log(err);
  }
}

bot.action("bugun", async (ctx) => {
  ctx.answerCbQuery();

  console.log(today);
  ctx.reply(`
       ${today.region} - ${today.date} : ${today.weekday}
       Saharlik = ${today.times.tong_saharlik}
       Quyosh = ${today.times.quyosh}
       Peshin = ${today.times.peshin}
       Asr = ${today.times.asr}
       Shom = ${today.times.shom_iftor}
       Hufton = ${today.times.hufton}
       `);
});
bot.launch();
