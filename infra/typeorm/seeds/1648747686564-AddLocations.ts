import {MigrationInterface, QueryRunner} from "typeorm";
import { State } from '../../../src/shared/entities/location/state.entity';
import { City } from '../../../src/shared/entities/location/city.entity';
import locations from './locations.json';

export class AddLocations1648747686564 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const locationData = locations.states;
    for (let stateData of locationData) {
      const state = await queryRunner.manager.save(
        queryRunner.manager.create<State>(State, { name: stateData.name })
      );
      console.log(state);
      for (let cityName of stateData.cities) {
        const city = await queryRunner.manager.save(
          queryRunner.manager.create<City>(City, {
            name: cityName,
            state: state
          })
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM cities');
    await queryRunner.query('DELETE FROM states');
  }

}
