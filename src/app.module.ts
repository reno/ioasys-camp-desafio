import { Module } from '@nestjs/common';
import envConfig from '@config/env';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path'; 
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
import { SavedThread } from '@shared/entities/saved_thread/savedThread.entity';
import { SavedThreadModule } from '@modules/saved_threads/savedThread.module';
import { BusinessType } from '@shared/entities/business_type/businessType.entity';
import { BusinessTypeModule } from '@modules/business_types/businessType.module';
import { EmailModule } from '@modules/email/email.module';
import { dirname, join } from 'path';
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
    MailerModule.forRoot({
      
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
          extName: '.hbs',
          layoutsDir: 'src/templates/',
        },
      },
      
      transport: envConfig().emailConnectionString,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envConfig().dbConnectionString,       
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
        Comment,
        SavedThread,
        BusinessType,
      ]
    }),
    AuthModule,
    LocationModule,
    UserModule,
    SubjectModule,
    ThreadModule,
    CommentModule,
    SearchModule,
    SavedThreadModule,
    BusinessTypeModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}