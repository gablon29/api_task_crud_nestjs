import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1739314014249 implements MigrationInterface {
    name = 'Roles1739314014249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "mimType"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "data"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "data_url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "data_url"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "data" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" ADD "mimType" character varying NOT NULL`);
    }

}
