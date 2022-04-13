import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { PageMetaDTO } from '@shared/dtos/page/meta.dto';
import { PageDTO } from '@shared/dtos/page/page.dto';
import { ThreadListDTO } from '@shared/dtos/thread/threadList.dto';
import { ThreadService } from '@modules/threads/thread.service';
import { SavedThreadRepository } from './repository/savedThread.repository';
import { SavedThread } from '@shared/entities/saved_threads/savedThread.entity';
import { SavedThreadDTO } from '@shared/dtos/saved_thread/savedThread.dto';
import { UserRepository } from '@modules/users/repository/user.repository';
import { PageOptionsDTO } from '@shared/dtos/page/pageOptions.dto';


@Injectable()
export class SavedThreadService {
  constructor(
    @InjectRepository(SavedThreadRepository)
    private readonly savedThreadRepository: SavedThreadRepository,
    @InjectRepository(ThreadRepository)
    private readonly threadRepository: ThreadRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly threadService: ThreadService,
  ) {}

  async findByUser(userId: string, pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<ThreadListDTO>> {
    const { entities, itemCount } = await this.savedThreadRepository.findByUser(userId, pageOptionsDTO);
    const savedThreads = await Promise.all(entities.map(async (entity) => {
      const thread = await this.threadRepository.findOne(entity.thread.id);
      const response = ThreadListDTO.fromEntity(thread);
      response.commentCount = await this.threadService.getCommentCount(thread.id);
      return response;
    }));
    const pageMetaDto = new PageMetaDTO({ itemCount, pageOptionsDTO });
    return new PageDTO(savedThreads, pageMetaDto);
  }

  async create(userId: string, savedThreadDTO: SavedThreadDTO) {
    const { threadId } = savedThreadDTO;
    const thread = await this.threadRepository.findOne(threadId);
    const user = await this.userRepository.findOne(userId);
    const alreadySaved = await this.savedThreadRepository.findOne({ user, thread });
    if (alreadySaved) {
      throw new HttpException("Thread already saved", HttpStatus.BAD_REQUEST,); 
    }
    const savedThread = this.savedThreadRepository.create();
    savedThread.thread = thread;
    savedThread.user = user;
    return await this.savedThreadRepository.save(savedThread);
  }

  async remove(id: string): Promise<SavedThread> {
    const savedThread = await this.savedThreadRepository.findOne(id);
    if (!savedThread) {
      throw new HttpException("Thread doesn't exist", HttpStatus.BAD_REQUEST);
    }
    await this.savedThreadRepository.softDelete({ id });
    return savedThread;
  }
}