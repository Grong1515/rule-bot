import {MigrationInterface, QueryRunner} from "typeorm";

export class addedMembersColumnToPollEntity1571224071302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `ALTER TABLE "poll" ADD "members" integer;
            UPDATE "poll" SET "members" = 0;
            ALTER TABLE poll ALTER COLUMN members SET NOT NULL;`
        , undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "poll" DROP COLUMN "members"`, undefined);
    }

}
