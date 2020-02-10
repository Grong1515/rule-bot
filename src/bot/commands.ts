import { Markup, Extra } from 'telegraf'

import RuleService from '../services/RuleService';
import PollService from '../services/PollService';


export default function (bot) {
  const ruleService = new RuleService();
  const pollService = new PollService();

  bot.command("rules", async (ctx) => {
    const rules = await ruleService.listChatRules(ctx.chat);

    const msg = `Правила клуба ${ctx.chat.title}:\n\n` + (rules.map((el, i) => {
      return `${i+1}. ${el.text}`;
    }).join('\n') || "Пока ничего нет.")

    const keyboard = Markup
      .keyboard(rules.map((el, i) => [`${i+1}. ${el.text}`]))
      // .oneTime()
      // .resize()
      // .extra()

    return ctx.reply(msg, keyboard);
  })


  bot.command('addrule', async (ctx) => {
    // to prevent from that https://github.com/telegraf/telegraf/issues/420
    ctx.webhookReply = false;
    if (ctx.chat.type === 'private') return ctx.reply('Тут нельзя, надо в групповом чате');
    let text = ctx.state.command.args;
    if (!text) return ctx.reply('неа');

    ruleService.requestAddRule(text, ctx.chat, await ctx.telegram.getChatMembersCount(ctx.chat.id))
      .then(poll => 
        ctx.replyWithPoll("Добавляем?:\n" + text, ['Да', 'Nет'])
        .then(async m => ruleService.proceedAddRule(m, poll)).catch(err => {
          console.log(err)
          ctx.telegram.deleteMessage(poll.chat, poll.message);
          ctx.reply(err);
        })
      );
  })

  bot.on('poll', async (ctx) => {
    const poll = await pollService.getPollInfo(ctx.poll.id);

    if (ctx.poll.is_closed) {
      let res = await pollService.closePoll(ctx.poll);
      return ctx.telegram.sendMessage(poll.chat, res);
    };

    return await pollService.handleRuleVotion(ctx.poll).then(async shouldClose => {
      shouldClose && ctx.telegram.stopPoll(poll.chat, poll.message);
    })
  })

  bot.hears(/(\d+) правило/, async ({match, chat, reply, message}) => {
    const rules = await ruleService.listChatRules(chat);
    const index = Number(match[1]) - 1;
    
    if (index < 0 || rules.length <= index) return;
    reply(`${index+1}. ${rules[index].text} ☝️`, Extra.inReplyTo(message.message_id))
  })
}