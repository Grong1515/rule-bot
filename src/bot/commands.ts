import RuleService from '../services/RuleService';
import PollService from '../services/PollService';
import { Context } from 'vm';


export default function (bot) {
  const ruleService = new RuleService();
  const pollService = new PollService();

  bot.command("rules", async (ctx) => {
    return ctx.reply(await ruleService.listChatRules(ctx.chat));
  })


  bot.command('addrule', async (ctx) => {
    // to prevent from that https://github.com/telegraf/telegraf/issues/420
    ctx.webhookReply = false;
    if (ctx.chat.type === 'private') return ctx.reply('Тут нельзя, надо в групповом чате');
    let text = ctx.message.text.slice(9);
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
}