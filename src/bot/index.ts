import Telegraf from 'telegraf';
import PollService from '../services/PollService';
import RuleService from '../services/RuleService';
const commandParts = require('telegraf-command-parts');

import commands from './commands'
 
const bot = new Telegraf(process.env.BOT_TOKEN)

const ruleService = new RuleService();
const pollService = new PollService();

process.env.HOOK_URL && bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username; 
});
bot.use(commandParts());
bot.start((ctx) => ctx.reply(process.env.HELLO_MSG || "Start"))
bot.catch((err) => {
  console.log('Ooops', err)
})
commands(bot, ruleService, pollService);

module.exports = bot;