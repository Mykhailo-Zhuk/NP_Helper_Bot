import { Telegraf, Markup } from 'telegraf';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

import * as outputMsg from './const.js';
import { checkValidPhoneNumber } from './services/PhoneNumber.js';
import { checkValidInvoice } from './services/Invoice.js';

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(
  async (ctx) =>
    await ctx.replyWithHTML(
      `Привіт <b>${ctx.message.from.first_name ? ctx.message.from.first_name : 'Незнайомець'}</b>!`,
      Markup.inlineKeyboard([
        [Markup.button.callback('Отримати оплачену посилку', 'btn1')],
        [Markup.button.callback('Залишити відгук', 'btn2')],
      ]),
    ),
);
bot.help((ctx) => ctx.reply(outputMsg.commands));

// Commands
bot.command('get_paid', async (ctx) => {
  try {
    await ctx.replyWithHTML(
      outputMsg.commandText[0],
      Markup.inlineKeyboard([
        [
          Markup.button.callback('Цифри накладної', 'btn3'),
          Markup.button.callback('Номер телефону', 'btn4'),
        ],
      ]),
    );
  } catch (error) {
    console.log(error.message);
  }
});
// Funtions

// Actions btn1, btn2
bot.action('btn1', async (ctx) => {
  try {
    await ctx.replyWithHTML(
      outputMsg.commandText[0],
      Markup.inlineKeyboard([
        [
          Markup.button.callback('Цифри накладної', 'btn3'),
          Markup.button.callback('Номер телефону', 'btn4'),
        ],
      ]),
    );
  } catch (error) {
    console.log(error.message);
  }
});
bot.action('btn2', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    await ctx.replyWithHTML('Даний розділ в процесі розробки');
  } catch (error) {
    console.log(error.message);
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
          axios
            .post('http://localhost:5000/api/queries/', result)
            .then((res) => {
              // handle success
              const { _id, response } = res.data;
              if (!response || !_id) return;
              console.log('Send successfully');
              return { _id, response };
            })
            .then((res) => {
              // handle success
              ctx.replyWithHTML(message.actionsText[6]);
              const timerId = setInterval(
                async () =>
                  await axios
                    .get(`http://localhost:5000/api/queries/${res._id}`)
                    .then(async (res) => {
                      // handle success
                      const { response } = res.data;
                      await ctx.replyWithHTML(message.actionsText[7]);
                      if (response !== 'empty' || '') {
                        clearInterval(timerId);
                        return await ctx.replyWithHTML(message.actionsText[8]);
                      }
                    })
                    .catch((error) => {
                      // handle error
                      clearInterval(timerId);
                      console.log(error.message);
                    }),
                15000,
              );
              // Stop after 10 min
              setTimeout(() => {
                clearInterval(timerId);
              }, 600000);
            })
            .catch((error) => {
              // handle error
              console.log(error.message);
            });
        } catch (error) {
          // handle error
          console.log(error.message);
        }
      });
    } catch (error) {
      // handle error
      console.log(error.message);
    }
  });
};
addActionBot('btn3', outputMsg, checkValidInvoice);
addActionBot('btn4', outputMsg, checkValidPhoneNumber);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
