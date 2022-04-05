import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from '@modules/comments/repository/comment.repository';
import { Comment } from '@shared/entities/comment/comment.entity';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { UserRepository } from '@modules/users/repository/user.repository';
import { CreateCommentDTO } from '@shared/dtos/comment/createComment.dto'
import { UpdateCommentDTO } from '@shared/dtos/comment/updateComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
    @InjectRepository(ThreadRepository)
    private readonly threadRepository: ThreadRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async findById(id: string): Promise<Comment> {
    return await this.commentRepository.findOne(id);
  }

  async create(userId: string, createCommentDTO: CreateCommentDTO): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDTO);
    const { threadId } = createCommentDTO;
    comment.thread = await this.threadRepository.findOne(threadId);
    comment.user = await this.userRepository.findOne(userId);
    return await this.commentRepository.save(comment);
  }

  async update(id: string, updateCommentDTO: UpdateCommentDTO): Promise<Comment> {
    let comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new HttpException("Comment doesn't exist", HttpStatus.BAD_REQUEST,);
    }
    const data = {
        ...comment,
        ...updateCommentDTO,
    };
    await this.commentRepository.update({ id }, data);
    comment = await this.commentRepository.findOne(id);
    return comment;
  }

  async remove(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);
    if (!comment) {
      throw new HttpException("Thread doesn't exist", HttpStatus.BAD_REQUEST);
    }
    await this.commentRepository.softDelete({ id });
    return comment;
  }
}
