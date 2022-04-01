import { Module } from '@nestjs/common';
import envConfig from '@config/env';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as path from 'path';
import * as winston from 'winston';
import { UserModule } from '@modules/users/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { LocationModule } from '@modules/location/location.module';
import { State } from '@shared/entities/location/state.entity';
import { City } from '@shared/entities/location/city.entity';
import { User } from '@shared/entities/user/user.entity';
import { File } from '@shared/entities/file/file.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,       
      synchronize: false,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
      entities: [//[path.join(__dirname, '**', '*.entity.{ts,js}')],
        State,
        City,
        User, 
        File
      ]
    }),
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
    LocationModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}