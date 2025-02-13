import { MigrationInterface, QueryRunner } from "typeorm";

export class Description1739481860246 implements MigrationInterface {
    name = 'Description1739481860246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "description"`);
    }

}
