import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

import { UserController } from '@modules/users/user.controller';
import { UserService } from '@modules/users/user.service';
import { UserRepository } from '@modules/users/repository/user.repository';
import { CityRepository } from '@modules/location/repository/city.repository';
import { StateRepository } from '@modules/location/repository/state.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, CityRepository, StateRepository]),
    BcryptProvider,
  ],
  providers: [
    BcryptProvider,
    UserService,
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
