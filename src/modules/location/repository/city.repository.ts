import { City } from "@shared/entities/location/city.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(City)
export class CityRepository extends Repository<City> {}