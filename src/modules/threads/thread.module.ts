import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { UserRepository } from '@modules/users/repository/user.repository';
import { ThreadController } from '@modules/threads/thread.controller';
import { ThreadService } from '@modules/threads/thread.service';
import { SubjectRepository } from '@modules/subjects/repository/subject.repository';
import { CommentRepository } from '@modules/comments/repository/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ThreadRepository,
      SubjectRepository,
      CommentRepository,
      UserRepository
    ]),
  ],
  controllers: [ThreadController],
  providers: [ThreadService],
  exports: [ThreadService]
})
export class ThreadModule {}
