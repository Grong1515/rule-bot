import {getConnection, getRepository} from 'typeorm';
import Rule from '../entity/Rule';
import Chat from '../interfaces/Chat';
import Poll from '../entity/Poll';
import EmptyValueException from '../exceptions/EmptyValueException';
import { Message } from 'telegram-typings';


export default class RuleService {
  private readonly ruleRepository = getRepository(Rule);
  private readonly pollRepository = getRepository(Poll);

  async listChatRules(chat: Chat): Promise<Rule[]> {
    const rules = await this.ruleRepository.find({chat: chat.id, active: true});
    return rules;
  }

  async requestAddRule(text: string, chat: Chat, members: number) {
    if (!text) throw new EmptyValueException("text is empty");

    let poll = this.createRuleRequest(text, chat.id, members);
    return poll;
  }

  async proceedAddRule(m: Message, poll: Poll): Promise<Poll> {
    //@ts-ignore
    poll.id = m.poll.id;
    poll.message = m.message_id;
    poll.chat = m.chat.id;
    await this.pollRepository.save(poll);
    return poll;
  }

  createRuleRequest(text: string, chat: number, members: number) {
    const rule = new Rule();
    rule.text = text;
    rule.chat = chat;
    let poll = new Poll();
    poll.rule = rule;
    poll.members = members;
    return poll;
  }
}