import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

import { UserController } from '@modules/users/user.controller';
import { UserService } from '@modules/users/user.service';
import { UserRepository } from '@modules/users/repository/user.repository';
import { CityRepository } from '@modules/location/repository/city.repository';
import { StateRepository } from '@modules/location/repository/state.repository';
import { FilesService } from '@modules/files/files.service';
import { FileRepository } from '@modules/files/repository/file.repository';
import { BusinessTypeRepository } from '@modules/business_types/repository/businessType.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        UserRepository,
        CityRepository,
        StateRepository,
        FileRepository,
        BusinessTypeRepository
      ],  
    ),
    BcryptProvider,
  ],
  providers: [
    BcryptProvider,
    UserService,
    FilesService,
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
