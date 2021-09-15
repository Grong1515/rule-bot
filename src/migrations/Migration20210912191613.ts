import { Migration } from '@mikro-orm/migrations';

export class Migration20210912191613 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "rule" ("id" serial primary key, "text" varchar(255) not null, "chat" int4 not null, "active" bool not null);');

    this.addSql('create table "poll" ("id" varchar(255) not null, "message" int4 not null, "chat" int4 not null, "yes" int4 not null, "no" int4 not null, "ruleId" int4 null, "members" int4 not null);');
    this.addSql('alter table "poll" add constraint "poll_pkey" primary key ("id");');
    this.addSql('alter table "poll" add constraint "REL_d089da274b098014a8e565e244" unique ("ruleId");');

    this.addSql('alter table "poll" add constraint "poll_ruleId_foreign" foreign key ("ruleId") references "rule" ("id") on update cascade on delete set null;');
  }

}
