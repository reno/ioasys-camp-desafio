import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSubjectThreadCommentTables1649098023991 implements MigrationInterface {
    name = 'AddSubjectThreadCommentTables1649098023991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subjects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "picture_id" uuid, CONSTRAINT "REL_2d2908382b5ee4e74bd8e35bfa" UNIQUE ("picture_id"), CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "threads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "subject_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "thread_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "FK_2d2908382b5ee4e74bd8e35bfa6" FOREIGN KEY ("picture_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_b3eb9ea6c0f9c01be7eff52fb95" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_a6cc1a07ec07e376947ed1016a0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e7d9c02826213be7fb6487f3909" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e7d9c02826213be7fb6487f3909"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_a6cc1a07ec07e376947ed1016a0"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_b3eb9ea6c0f9c01be7eff52fb95"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "FK_2d2908382b5ee4e74bd8e35bfa6"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "threads"`);
        await queryRunner.query(`DROP TABLE "subjects"`);
    }

}
