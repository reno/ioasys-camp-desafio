import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBusinessTypesTable1649959280157 implements MigrationInterface {
    name = 'AddBusinessTypesTable1649959280157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3c34c2b0b96fd7d13d7b4750b27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "business_type_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c8197409f9164e386cb2674b3f3" FOREIGN KEY ("business_type_id") REFERENCES "business_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c8197409f9164e386cb2674b3f3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "business_type_id"`);
        await queryRunner.query(`DROP TABLE "business_types"`);
    }

}
