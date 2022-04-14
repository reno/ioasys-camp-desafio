import {MigrationInterface, QueryRunner} from "typeorm";
import { BusinessType } from '../../../src/shared/entities/business_type/businessType.entity'

export class AddBusinessTypes1649960711369 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Açaí',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Bar/pub',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Cafeteria',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Churrascaria',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Depósito de bebidas',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Doces/bolos',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Oriental',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Lancheria',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Marmitex',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Pizzaria',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Restaurante',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Vegano',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<BusinessType>(BusinessType, {
        name: 'Outros',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM business_types');
  }

}
