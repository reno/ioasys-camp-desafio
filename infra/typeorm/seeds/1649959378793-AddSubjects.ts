import {MigrationInterface, QueryRunner} from "typeorm";
import { Subject } from '../../../src/shared/entities/subject/subject.entity';

export class AddSubjects1649959378793 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Administração',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Aluguel, compra e venda',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Finanças',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Marketing',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Colaboradores',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Inovação',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Fornecedores',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Happy Hour',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Notícias',
      })
    );
    await queryRunner.manager.save(
      queryRunner.manager.create<Subject>(Subject, {
        name: 'Estudos',
      })
    );
  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM subjects');
  }
}
