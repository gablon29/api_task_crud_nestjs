import { MigrationInterface, QueryRunner } from "typeorm";

export class Files1737490624105 implements MigrationInterface {
    name = 'Files1737490624105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mimType" character varying NOT NULL, "data" bytea NOT NULL, "todoId" integer, CONSTRAINT "REL_3e4bcbd8fe38213cae99b76352" UNIQUE ("todoId"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_3e4bcbd8fe38213cae99b763522"`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
