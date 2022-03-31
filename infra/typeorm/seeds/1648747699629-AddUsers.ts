import {MigrationInterface, QueryRunner} from "typeorm";
import { User, UserRole } from '../../../src/shared/entities/user/user.entity';
import { State } from '../../../src/shared/entities/location/state.entity';
import { City } from '../../../src/shared/entities/location/city.entity';

export class AddUsers1648747699629 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const state = await queryRunner.manager.findOne(State, {
      where: { name: 'Minas Gerais' }
    });
    const city = await queryRunner.manager.findOne(City, {
      where: { name: 'Lavras' }
    });
    const user = await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        email: 'renan.modenese@gmail.com',
        password: 'Camp@123',
        firstName: 'Renan',
        lastName: 'Modenese',
        businessName: 'ioasys',
        cnpj: '01234567890123',
        phone: '35 98867-5310',
        role: UserRole.USER,
        city: city,
        state: state
      })
    );
    const admin = await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        email: 'admin@mail.com',
        password: 'Camp@123',
        firstName: 'Admin',
        lastName: 'Silva',
        businessName: 'ioasys',
        cnpj: '31710979000115',
        phone: '31 4141-5148',
        role: UserRole.ADMIN,
        city: city,
        state: state
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM users');
  }

}
