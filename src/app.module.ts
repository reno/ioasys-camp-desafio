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
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      logging: true,
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    AuthModule,
    LocationModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}