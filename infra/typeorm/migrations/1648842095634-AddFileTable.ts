import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFileTable1648842095634 implements MigrationInterface {
    name = 'AddFileTable1648842095634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_c3401836efedec3bec459c8f818" UNIQUE ("avatar_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818" FOREIGN KEY ("avatar_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_c3401836efedec3bec459c8f818"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar_id"`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
