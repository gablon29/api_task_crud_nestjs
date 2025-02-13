import { MigrationInterface, QueryRunner } from "typeorm";

export class CompletedProperty1739480117675 implements MigrationInterface {
    name = 'CompletedProperty1739480117675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "completed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "completed" DROP DEFAULT`);
    }

}
