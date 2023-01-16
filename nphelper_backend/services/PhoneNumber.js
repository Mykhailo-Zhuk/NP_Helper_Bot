import * as message from '../const.js';

export const checkValidPhoneNumber = async (ctx, inputData) => {
  const number = inputData.match(/0(66|67|68|98|97|50|73|93|99)\d{7}/g);
  const lastName = inputData.match(/[A-Z]\w+|[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+/g);

  // Missed number or lastName
  if (number === null || lastName === null) {
    await ctx.replyWithHTML(message.actionsText[2]);
    return;
  }
  const num = number.at(0);
  const name = lastName.at(0);
  // Invoice number.length < 9 digits && > 13 digits
  if (num.length < 9 || num.length > 13) {
    await ctx.replyWithHTML(message.actionsText[3]);
    return;
  }
  console.log(num, name);
  // Last name.length > 15 digits
  if (name.length > 15) {
    await ctx.replyWithHTML(message.actionsText[4]);
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
