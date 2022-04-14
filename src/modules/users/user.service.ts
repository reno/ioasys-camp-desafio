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
import { CityRepository } from '@modules/location/repository/city.repository';
import { StateRepository } from '@modules/location/repository/state.repository';
import { FilesService } from '@modules/files/files.service';
import { BusinessType } from '@shared/entities/business_type/businessType.entity';
import { BusinessTypeRepository } from '@modules/business_types/repository/businessType.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(CityRepository)
    private readonly cityRepository: CityRepository,
    @InjectRepository(StateRepository)
    private readonly stateRepository: StateRepository,
    @InjectRepository(BusinessTypeRepository)
    private readonly businessTypeRepository: BusinessTypeRepository,
    private readonly encryptProvider: BcryptProvider,
    private readonly filesService: FilesService
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
      const { cityId, stateId, businessTypeId } = createUserDTO;
      const state = await this.stateRepository.findOne(stateId);
      const city = await this.cityRepository.findOne(cityId);
      const businessType = await this.businessTypeRepository.findOne(businessTypeId);
      return this.userRepository.createUser(createUserDTO, city, state, businessType);
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

  async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
    const user = await this.findById(userId);
    if (user.avatar) {
      await this.userRepository.update(userId, {
        ...user,
        avatar: null
      });
      await this.filesService.delete(user.avatar.id);
    }
    const avatar = await this.filesService.upload(imageBuffer, filename);
    await this.userRepository.update(userId, {
      ...user,
      avatar
    });
    return avatar;
  }

  async deleteAvatar(userId: string) {
    const user = await this.findById(userId);
    const fileId = user.avatar?.id;
    if (fileId) {
      await this.userRepository.update(userId, {
        ...user,
        avatar: null
      });
      await this.filesService.delete(fileId)
    }
  }

  private async _checkUnique(createUserDTO: CreateUserDTO): Promise<boolean> {
    const { email } = createUserDTO;
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists) {
      throw new ConflictException(alreadyExists('email'));
    }
    return true;
  }
}
