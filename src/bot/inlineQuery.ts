import Telegraf from 'telegraf'
import Markup from 'telegraf/markup'

import RuleService from '../services/RuleService';
import PollService from '../services/PollService';
import { InlineQueryResultArticle } from 'telegraf/typings/telegram-types';


export default function (bot, ruleService: RuleService, pollService: PollService) {
  bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
    console.log(inlineQuery)

    const rules = await ruleService.listChatRules(ctx.chat)
    

    const results = [
      {
        thumbnail: "1",
        title: 'hi',
        href: 'http://az.lib.ru/m/majakowskij_w_w/',
      },
      {
        thumbnail: "2",
        title: 'hi 3',
        href: 'http://az.lib.ru/m/majakowskij_w_w/',
      },
      {
        thumbnail: "143",
        title: 'hiffv',
        href: 'http://az.lib.ru/m/majakowskij_w_w/',
      },
      {
        thumbnail: "16",
        title: 'hifvfv',
        href: 'http://az.lib.ru/m/majakowskij_w_w/',
      },
      {
        thumbnail: "1234",
        title: 'hifvdsfv',
        href: 'http://az.lib.ru/m/majakowskij_w_w/',
      },
    ]
    const recipes = results
      .filter(({ thumbnail }) => thumbnail)
      .map(({ title, href, thumbnail }) => ({
        type: 'article',
        id: thumbnail,
        title: title,
        description: title,
        thumb_url: href,
        input_message_content: {
          message_text: title
        },
        // reply_markup: Markup.inlineKeyboard([
        //   Markup.button('Go to recipe', href)
        // ])
        reply: title,
      } as InlineQueryResultArticle))
    return answerInlineQuery(recipes)
  })

  bot.on("inline_query", async (ctx) => {
    return ctx.reply(await ruleService.listChatRules(ctx.chat));
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
}