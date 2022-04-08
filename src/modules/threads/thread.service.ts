import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { CreateThreadDTO } from '@shared/dtos/thread/createThread.dto';
import { UpdateThreadDTO } from '@shared/dtos/thread/updateThread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@modules/users/repository/user.repository';
import { SubjectRepository } from '@modules/subjects/repository/subject.repository';
import { Thread } from '@shared/entities/thread/thread.entity';
import { CommentRepository } from '@modules/comments/repository/comment.repository';
import { ThreadDetailDTO } from '@shared/dtos/thread/threadDetail.dto';
import { PageDTO } from '@shared/dtos/page/page.dto';
import { PageOptionsDTO } from '@shared/dtos/page/pageOptions.dto';
import { PageMetaDTO } from '@shared/dtos/page/meta.dto';
import { RecentThreadsDTO } from '@shared/dtos/thread/recentThreads.dto';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(ThreadRepository)
    private readonly threadRepository: ThreadRepository,
    @InjectRepository(SubjectRepository)
    private readonly subjectRepository: SubjectRepository,
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async findById(id : string): Promise<Thread> {
    return await this.threadRepository.findOne(id);
  }

  async findOne(id: string): Promise<ThreadDetailDTO> {
    const thread = await this.threadRepository.findOne(id, {
      relations: ['comments'],
    });
    const response = ThreadDetailDTO.fromEntity(thread);
    response.commentCount = await this.getCommentCount(id);
    return response;
  }

  async findAll(pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<RecentThreadsDTO>> {
    const queryBuilder = this.threadRepository.createQueryBuilder("thread");
    queryBuilder
      .leftJoinAndSelect('thread.user', 'user')
      .leftJoinAndSelect('thread.subject', 'subject')
      .orderBy("thread.createdAt", "DESC")
      .skip(pageOptionsDTO.skip)
      .take(pageOptionsDTO.take);
    const itemCount = await queryBuilder.getCount();
    let { entities } = await queryBuilder.getRawAndEntities();
    const threads = await Promise.all(entities.map(async (entity) => {
      const response = RecentThreadsDTO.fromEntity(entity);
      response.commentCount = await this.getCommentCount(entity.id);
      return response;
    }));
    const pageMetaDto = new PageMetaDTO({ itemCount, pageOptionsDTO });
    return new PageDTO(threads, pageMetaDto);
  }

  async create(userId: string, createThreadDTO: CreateThreadDTO): Promise<Thread> {
    const thread = this.threadRepository.create(createThreadDTO);
    const { subjectId } = createThreadDTO;
    thread.subject = await this.subjectRepository.findOne(subjectId);
    thread.user = await this.userRepository.findOne(userId);
    return await this.threadRepository.save(thread);
  }

  async update(id: string, updateThreadDTO: UpdateThreadDTO): Promise<Thread> {
    let thread = await this.threadRepository.findOne(id);
    if (!thread) {
      throw new HttpException("Subject doesn't exist", HttpStatus.BAD_REQUEST,);
    }
    const data = {
        ...thread,
        ...updateThreadDTO,
    };
    await this.threadRepository.update({ id }, data);
    thread = await this.threadRepository.findOne(id);
    return thread;
  }

  async remove(id: string): Promise<Thread> {
    const thread = await this.threadRepository.findOne(id);
    if (!thread) {
      throw new HttpException("Thread doesn't exist", HttpStatus.BAD_REQUEST);
    }
    await this.threadRepository.softDelete({ id });
    return thread;
  }

  async getCommentCount(threadId: string): Promise<number> {
    const queryBuilder = this.commentRepository.createQueryBuilder('comment');
    queryBuilder.where('comment.thread = :thread', { thread: threadId })
    return await queryBuilder.getCount();
  }
}