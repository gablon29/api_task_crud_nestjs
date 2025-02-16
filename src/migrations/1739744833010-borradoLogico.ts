import { MigrationInterface, QueryRunner } from "typeorm";

export class BorradoLogico1739744833010 implements MigrationInterface {
    name = 'BorradoLogico1739744833010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    }

}
