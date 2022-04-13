import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSavedThreadsTable1649879460561 implements MigrationInterface {
    name = 'AddSavedThreadsTable1649879460561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "saved_threads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid, "thread_id" uuid NOT NULL, CONSTRAINT "UQ_5e3accb8837bfb18f41c9ac2218" UNIQUE ("user_id", "thread_id"), CONSTRAINT "PK_28cc179ed14323ebcb3a00602d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_930d8099f86c97741d74e21119" ON "threads" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac06eb7b4b7b24b599f6b4a6e9" ON "threads" ("content") `);
        await queryRunner.query(`ALTER TABLE "saved_threads" ADD CONSTRAINT "FK_23bea2682c7786798573f5763bb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_threads" ADD CONSTRAINT "FK_c823d7a1179b7a6c954d242b0fc" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_threads" DROP CONSTRAINT "FK_c823d7a1179b7a6c954d242b0fc"`);
        await queryRunner.query(`ALTER TABLE "saved_threads" DROP CONSTRAINT "FK_23bea2682c7786798573f5763bb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac06eb7b4b7b24b599f6b4a6e9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_930d8099f86c97741d74e21119"`);
        await queryRunner.query(`DROP TABLE "saved_threads"`);
    }

}
