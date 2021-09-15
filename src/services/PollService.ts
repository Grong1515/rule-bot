import { Poll } from "../entity/Poll";
import { getOrm } from "../orm";

export default class PollService {
  private readonly pollRepository = getOrm().em.getRepository(Poll);

  async handleRuleVotion(poll: any): Promise<boolean> {
    let pollEntity = await this.pollRepository.findOneOrFail(poll.id);

    pollEntity.yes = poll.options[0].voter_count;
    pollEntity.no = poll.options[1].voter_count;
    this.pollRepository.flush();
    // returns should poll be closed or not
    return (pollEntity.yes + pollEntity.no  === pollEntity.members) || (Math.abs(pollEntity.yes - pollEntity.no) >= pollEntity.members/2);
  }

  async closePoll(poll): Promise<string> {
    let pollEntity = await this.pollRepository.findOneOrFail(poll.id);

    // console.log('closing poll:', pollEntity);
    pollEntity.rule.active = pollEntity.yes > pollEntity.no;
    await this.pollRepository.flush();
    console.log('poll closed');
    return (pollEntity.rule.active ? 'новое правило: ' : 'БАН: ') + pollEntity.rule.text;
  }

  async getPollInfo(id: string) {
    const pollEntity = await this.pollRepository.findOneOrFail(id);
    return pollEntity;
  }
}