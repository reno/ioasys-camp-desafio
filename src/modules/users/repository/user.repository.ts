import { EntityRepository, Repository } from 'typeorm';
import { User, UserRole } from '@shared/entities/user/user.entity';
import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CityRepository } from '@modules/location/repository/city.repository';
import { StateRepository } from '@modules/location/repository/state.repository';
import { City } from '@shared/entities/location/city.entity';
import { State } from '@shared/entities/location/state.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.findOne(id, { relations: ['city', 'state'] });
  }

  async createUser(createUserDTO: CreateUserDTO, city: City, state: State): Promise<User> {
    const user = this.create(createUserDTO);
    user.city = city;
    user.state = state;
    user.isActive = true;
    return this.save(user);
  }
}
