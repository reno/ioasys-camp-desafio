import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { CommentRepository } from '@modules/comments/repository/comment.repository';
import { SearchService } from '@modules/search/search.service';
import { SearchController } from '@modules/search/search.controller';
import { ThreadService } from '@modules/threads/thread.service';
import { SubjectRepository } from '@modules/subjects/repository/subject.repository';
import { UserRepository } from '@modules/users/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ThreadRepository,
      CommentRepository,
      SubjectRepository,
      UserRepository
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService, ThreadService]
})
export class SearchModule {}


