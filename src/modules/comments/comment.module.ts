import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { UserRepository } from '@modules/users/repository/user.repository';
import { CommentRepository } from '@modules/comments/repository/comment.repository';
import { CommentController } from '@modules/comments/comment.controller';
import { CommentService } from '@modules/comments/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      ThreadRepository,      
      UserRepository
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
