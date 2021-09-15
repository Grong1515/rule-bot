import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Rule } from './Rule';

@Entity()
export class Poll {

  @PrimaryKey()
  id!: string;

  @Property()
  message!: number;

  @Property()
  chat!: number;

  @Property()
  yes: number = 0;

  @Property()
  no: number = 0;

  @OneToOne({ entity: () => Rule, fieldName: 'ruleId', nullable: true, unique: 'REL_d089da274b098014a8e565e244' })
  rule?: Rule;

  @Property()
  members!: number;

}
