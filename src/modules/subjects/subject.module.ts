import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectRepository } from '@modules/subjects/repository/subject.repository';
import { SubjectController } from '@modules/subjects/subject.controller';
import { SubjectService } from '@modules/subjects/subject.service';
import { FileRepository } from '@modules/files/repository/file.repository';
import { FilesService } from '@modules/files/files.service';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { ThreadService } from '@modules/threads/thread.service';
import { CommentRepository } from '@modules/comments/repository/comment.repository';
import { UserRepository } from '@modules/users/repository/user.repository';
import { CityRepository } from '@modules/location/repository/city.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubjectRepository,
      FileRepository,
      ThreadRepository,
      CommentRepository,
      UserRepository,
      CityRepository,
    ]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService, ThreadService, FilesService]
})
export class SubjectModule {}
