import * as message from '../const.js';

export const checkValidInvoice = async (ctx, inputData) => {
  const number = inputData.match(/\d+/g);
  const lastName = inputData.match(/[A-Z]\w+|[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+/g);

  // Missed number or lastName
  if (number === null || lastName === null) {
    await ctx.replyWithHTML(message.actionsText[2]);
    return;
  }
  const num = number.at(0);
  const name = lastName.at(0);
  // Invoice number.length < 4 digits && > 4 digits
  if (num.length < 4 || num.length >= 5) {
    await ctx.replyWithHTML(message.actionsText[3]);
    return;
  }

  // Last name.length > 15 digits
  if (name.length > 15) {
    await ctx.replyWithHTML(message.actionsText[5]);
    return;
  }

  return {
    number: num,
    lastName: name,
    response: 'empty',
    completed: false,
    date: 'none',
  };
};
