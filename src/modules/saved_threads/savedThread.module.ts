import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { ThreadService } from '@modules/threads/thread.service';
import { UserRepository } from '@modules/users/repository/user.repository';
import { SavedThreadRepository } from '@modules/saved_threads/repository/savedThread.repository';
import { SavedThreadService } from '@modules/saved_threads/savedThread.service';
import { SavedThreadController } from '@modules/saved_threads/savedThread.controller';
import { SubjectRepository } from '@modules/subjects/repository/subject.repository';
import { CommentRepository } from '@modules/comments/repository/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ThreadRepository,
      SubjectRepository,
      CommentRepository,
      UserRepository,
      SavedThreadRepository,
    ]),
  ],
  controllers: [SavedThreadController],
  providers: [SavedThreadService, ThreadService]
})
export class SavedThreadModule {}
