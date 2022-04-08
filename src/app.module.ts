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
import { Subject } from '@shared/entities/subject/subject.entity';
import { Thread } from '@shared/entities/thread/thread.entity';
import { Comment } from '@shared/entities/comment/comment.entity';
import { SubjectModule } from '@modules/subjects/subject.module';
import { ThreadModule } from '@modules/threads/thread.module';
import { CommentModule } from '@modules/comments/comment.module';
import { SearchModule } from '@modules/search/search.module';
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
      logging: true,
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
        File, 
        Subject,
        Thread,
        Comment
      ]
    }),
    AuthModule,
    LocationModule,
    UserModule,
    SubjectModule,
    ThreadModule,
    CommentModule,
    SearchModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}