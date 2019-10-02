import {MigrationInterface, QueryRunner} from "typeorm";

export class qwe1570130271022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "rule" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "chat" integer NOT NULL, "active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a5577f464213af7ffbe866e3cb5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "poll" ("id" character varying NOT NULL, "message" integer NOT NULL, "chat" integer NOT NULL, "yes" integer NOT NULL DEFAULT 0, "no" integer NOT NULL DEFAULT 0, "ruleId" integer, CONSTRAINT "REL_d089da274b098014a8e565e244" UNIQUE ("ruleId"), CONSTRAINT "PK_03b5cf19a7f562b231c3458527e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "poll" ADD CONSTRAINT "FK_d089da274b098014a8e565e2447" FOREIGN KEY ("ruleId") REFERENCES "rule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "poll" DROP CONSTRAINT "FK_d089da274b098014a8e565e2447"`, undefined);
        await queryRunner.query(`DROP TABLE "poll"`, undefined);
        await queryRunner.query(`DROP TABLE "rule"`, undefined);
    }

}
