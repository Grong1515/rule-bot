import { Application } from 'express';
import Telegraf from 'telegraf';
const commandParts = require('telegraf-command-parts');
import commands from './commands'

const SECRET_PATH = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const bot = new Telegraf(process.env.BOT_TOKEN)
export async function initBot (expressApp: Application) {
  process.env.HOOK_URL && bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username; 
  });
  
  bot.use(commandParts());
  bot.start((ctx) => ctx.reply(process.env.HELLO_MSG || "Start"))
  bot.catch((err) => {
    console.log('Ooops', err)
  });

  commands(bot);

  if (!process.env.HOOK_URL) {
    bot.launch();
  }
  else {
    expressApp.use(bot.webhookCallback('/' + SECRET_PATH));
    bot.telegram.setWebhook(process.env.HOOK_URL + SECRET_PATH);
    console.log('set webhook: ', process.env.HOOK_URL + SECRET_PATH);
  }
}

export default bot;