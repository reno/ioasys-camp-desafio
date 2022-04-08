import { CommentRepository } from '@modules/comments/repository/comment.repository';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDTO } from '@shared/dtos/page/page.dto';
import { PageOptionsDTO } from '@shared/dtos/page/pageOptions.dto';
import { ThreadListDTO } from '@shared/dtos/thread/threadList.dto';
import { Thread } from '@shared/entities/thread/thread.entity';
import { ThreadService } from '@modules/threads/thread.service';
import { PageMetaDTO } from '@shared/dtos/page/meta.dto';

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
    let queryBuilder = await this.threadRepository.createQueryBuilder('thread')
      .leftJoin('thread.comments', 'comments')
      .where(`to_tsvector(thread.title) @@ to_tsquery(:query)`, { query })
      .orWhere(`to_tsvector(thread.content) @@ to_tsquery(:query)`, { query })
      .orWhere(`to_tsvector(comments.content) @@ to_tsquery(:query)`, { query })
      .orderBy('thread.createdAt', pageOptionsDTO.order)
    const itemCount = await queryBuilder.getCount();
    let { entities } = await queryBuilder.getRawAndEntities();
    const threads = await Promise.all(entities.map(async (thread) => {
      const response = ThreadListDTO.fromEntity(thread);
      response.commentCount = await this.threadService.getCommentCount(thread.id);
      return response;
    })); 
    const pageMetaDto = new PageMetaDTO({ itemCount, pageOptionsDTO });
    return new PageDTO(threads, pageMetaDto);
  }
}
