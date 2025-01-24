import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationFile1737741032184 implements MigrationInterface {
    name = 'RelationFile1737741032184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522"`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "data"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "data" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "REL_3e4bcbd8fe38213cae99b76352"`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522"`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "REL_3e4bcbd8fe38213cae99b76352" UNIQUE ("todoId")`);
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "data"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "data" bytea NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
