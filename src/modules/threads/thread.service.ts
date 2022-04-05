import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { CreateThreadDTO } from '@shared/dtos/thread/createThread.dto';
import { UpdateThreadDTO } from '@shared/dtos/thread/updateThread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@modules/users/repository/user.repository';
import { SubjectRepository } from '@modules/subjects/repository/subject.repository';
import { Thread } from '@shared/entities/thread/thread.entity';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(ThreadRepository)
    private readonly threadRepository: ThreadRepository,
    @InjectRepository(SubjectRepository)
    private readonly subjectRepository: SubjectRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async findById(id : string): Promise<Thread> {
    return await this.threadRepository.findOne(id);
  }

  async findOne(id: string): Promise<Thread> {
    return await this.threadRepository.findOne(id, {
      relations: ['comments'],
    });
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
}