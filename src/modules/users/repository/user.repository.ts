import { EntityRepository, Repository } from 'typeorm';
import { User, UserRole } from '@shared/entities/user/user.entity';
import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.findOne(id);
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.create(createUserDTO);
    return this.save(user);
  }

  async createAdmin(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.create(createUserDTO);
    user.role = UserRole.ADMIN;
    return this.save(user);
  }
}
