import { Telegraf, Markup } from 'telegraf';
import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const bot = new Telegraf(process.env.BOT_TOKEN);

import * as outputMsg from './const.js';
import { checkValidPhoneNumber } from './services/PhoneNumber.js';
import { checkValidInvoice } from './services/Invoice.js';

const sendDataToServer = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/queries/', data);
    if (response.status !== 200) {
      throw new Error('Failed to send data to the server');
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

bot.start(async (ctx) => {
  try {
    const message = `Привіт <b>${
      ctx.message.from.first_name ? ctx.message.from.first_name : 'Незнайомець'
    }</b>!`;
    const markup = Markup.inlineKeyboard([
      [Markup.button.callback('Отримати оплачену посилку', 'btn1')],
      [Markup.button.callback('Залишити відгук', 'btn2')],
    ]);
    await ctx.replyWithHTML(message, markup);
  } catch (err) {
    console.log(err);
    throw err;
  }
});
bot.help((ctx) => ctx.reply(outputMsg.commands));

// Commands
bot.command('get_paid', async (ctx) => {
  try {
    const message = outputMsg.commandText[0];
    const markup = Markup.inlineKeyboard([
      [
        Markup.button.callback('Цифри накладної', 'btn3'),
        Markup.button.callback('Номер телефону', 'btn4'),
      ],
    ]);
    await ctx.replyWithHTML(message, markup);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// Actions btn1, btn2
bot.action('btn1', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    const message = outputMsg.commandText[0];
    const markup = Markup.inlineKeyboard([
      [
        Markup.button.callback('Цифри накладної', 'btn3'),
        Markup.button.callback('Номер телефону', 'btn4'),
      ],
    ]);
    await ctx.replyWithHTML(message, markup);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

bot.action('btn2', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    await ctx.replyWithHTML('Даний розділ в процесі розробки');
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// Actions btn3, btn4
const addActionBot = (name, message, checkFnc) => {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery();
      await ctx.replyWithHTML(
        `${name === 'btn4' ? message.actionsText[1] : message.actionsText[0]}`,
        {
          disable_web_page_preview: true,
        },
      );
      bot.on('text', async (ctx) => {
        try {
          const { text } = ctx.message;
          const result = await checkFnc(ctx, text);
          if (!result) return;
          const data = await sendDataToServer(result);
          ctx.replyWithHTML(message.actionsText[6]);
          console.log(data);
          const timerId = setInterval(async () => {
            try {
              const checkResult = await axios.get(`http://localhost:5000/api/queries/${data._id}`);
              await ctx.replyWithHTML(message.actionsText[7]);
              console.log('Case 5', checkResult.data);

              let { response } = checkResult.data;
              if (response === 'empty' || '') return;

              clearInterval(timerId);
              const answer =
                response.toLowerCase() !== 'ok' || 'done' || 'готово'
                  ? message.actionsText[9]
                  : response.charAt(0).toUpperCase() + response.slice(1) + '. ';
              await ctx.replyWithHTML(answer);
            } catch (err) {
              console.log('Case 2', err);
              clearInterval(timerId);
              throw err;
            }
          }, 30000);
          // Stop after 5 min
          setTimeout((ctx) => {
            ctx.replyWithHTML(
              'Можливо нам знадобиться більше часу для пошуку Вашої посилки або виникла іншого роду помилка. <b>Прошу зверніться до будь якого вільного оператора</b>',
            );
            clearInterval(timerId);
          }, 300000);
        } catch (err) {
          console.log('Case 3', err);
          throw err;
        }
      });
    } catch (err) {
      console.log('Case 4');
      throw err;
    }
  });
};

addActionBot('btn3', outputMsg, checkValidInvoice);
addActionBot('btn4', outputMsg, checkValidPhoneNumber);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
