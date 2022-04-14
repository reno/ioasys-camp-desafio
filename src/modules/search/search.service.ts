import { CommentRepository } from '@modules/comments/repository/comment.repository';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDTO } from '@shared/dtos/page/page.dto';
import { PageOptionsDTO } from '@shared/dtos/page/pageOptions.dto';
import { ThreadListDTO } from '@shared/dtos/thread/threadList.dto';
import { ThreadService } from '@modules/threads/thread.service';
import { PageMetaDTO } from '@shared/dtos/page/meta.dto';
import { RecentThreadsDTO } from '@shared/dtos/thread/recentThreads.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(ThreadRepository)
    private readonly threadRepository: ThreadRepository,
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
    private readonly threadService: ThreadService,
  ) {}

  async find(query: string, pageOptionsDTO: PageOptionsDTO) {
    const { entities, itemCount } = await this.threadRepository.findByQueryAndCount(query, pageOptionsDTO);
    const threads = await Promise.all(entities.map(async (entity) => {
      const response = RecentThreadsDTO.fromEntity(entity);
      response.commentCount = await this.threadService.getCommentCount(entity.id);
      return response;
    })); 
    const pageMetaDto = new PageMetaDTO({ itemCount, pageOptionsDTO });
    return new PageDTO(threads, pageMetaDto);
  }
}
