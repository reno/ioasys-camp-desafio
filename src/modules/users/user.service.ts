import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { alreadyExists } from '@shared/constants/errors';
import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/users/repository/user.repository';
import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { UpdateUserDTO } from '@shared/dtos/user/updateUser.dto';
import { LoginDTO } from '@shared/dtos/auth/login.dto';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly encryptProvider: BcryptProvider,
  ) {}

  async findById(id : string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async findByEmail({ email }: any): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
  
  async findByLogin({ email, password }: LoginDTO): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    let hash = user?.password;
    if (!user) {
        hash = await this.encryptProvider.createHash(Math.random().toString(36));  
    }
    const passwordMatch = await this.encryptProvider.compareHash(password, hash);
    if (!passwordMatch) {
        throw new HttpException('Invalid credentials.', HttpStatus.UNAUTHORIZED);    
    }
    return user;
  }
  
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    if (await this._checkUnique(createUserDTO)) {
      return await this.userRepository.createUser(createUserDTO);
    }
  }

  async createAdmin(createUserDTO: CreateUserDTO): Promise<User> {
    if (await this._checkUnique(createUserDTO)) {
      return await this.userRepository.createAdmin(createUserDTO);
    }
  }

  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    let user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST,);
    }
    const data = {
        ...user,
        ...updateUserDTO,
    };
    await this.userRepository.update({ id }, data);
    user = await this.userRepository.findOne({where: { id } });
    return user;
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.userRepository.findOne({where: { id },});
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.softDelete({ id });
    return user;
  }

  private async _checkUnique(createUserDTO: CreateUserDTO): Promise<Boolean> {
    const { email } = createUserDTO;
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) {
      throw new ConflictException(alreadyExists('email'));
    }
    return true;
  }
}
