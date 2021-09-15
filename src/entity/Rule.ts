import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Rule {

  @PrimaryKey()
  id!: number;

  @Property()
  text!: string;

  @Property()
  chat!: number;

  @Property()
  active: boolean = false;

}
