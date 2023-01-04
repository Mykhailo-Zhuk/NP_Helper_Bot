import * as message from '../const.js';

export const checkValidPhoneNumber = async (ctx, inputData) => {
  console.log('Case 2', inputData);
  const number = inputData.match(/\d+/g)[0];
  const lastName = inputData.match(/[A-Z]\w+|[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+/g)[0];

  // Missed number or lastName
  if (!number || !lastName) {
    await ctx.replyWithHTML(message.actionsText[1]);
    return;
  }

  // Invoice number.length < 9 digits && > 13 digits
  if (number.length < 9 || number.length > 13) {
    await ctx.replyWithHTML(message.actionsText[3]);
    return;
  }

  // Last name.length > 15 digits
  if (lastName.length > 15) {
    await ctx.replyWithHTML(message.actionsText[4]);
    return;
  }

  return {
    number,
    lastName,
    response: 'empty',
    completed: false,
    date: 'none',
  };
};
