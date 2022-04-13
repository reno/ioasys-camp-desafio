import { EntityRepository, Repository } from 'typeorm';
import { User } from '@shared/entities/user/user.entity';
import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { City } from '@shared/entities/location/city.entity';
import { State } from '@shared/entities/location/state.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.findOne(id, { relations: ['city', 'state'] });
  }

  async createUser(createUserDTO: CreateUserDTO, city: City, state: State): Promise<User> {
    const user = this.create(createUserDTO);
    user.city = city;
    user.state = state;
    user.isActive = true;
    return this.save(user);
  }
}
