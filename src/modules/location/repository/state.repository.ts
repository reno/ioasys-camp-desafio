import { State } from "@shared/entities/location/state.entity";
import { EntityRepository, Repository } from "typeorm";


@EntityRepository(State)
export class StateRepository extends Repository<State> {}