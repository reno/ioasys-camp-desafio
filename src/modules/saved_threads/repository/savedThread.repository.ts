import { EntityRepository, Repository } from "typeorm";
import { SavedThread } from '@shared/entities/saved_thread/savedThread.entity'
import { PageOptionsDTO } from "@shared/dtos/page/pageOptions.dto";

@EntityRepository(SavedThread)
export class SavedThreadRepository extends Repository<SavedThread> {

  async findByUser(userId: string, pageOptionsDTO: PageOptionsDTO) {
    const queryBuilder = this.createQueryBuilder('savedThread');
    queryBuilder
      .leftJoinAndSelect('savedThread.user', 'user')
      .leftJoinAndSelect('savedThread.thread', 'thread')
      .where('savedThread.user = :userId', { userId })
      .orderBy('savedThread.createdAt', pageOptionsDTO.order)
      .skip(pageOptionsDTO.skip)
      .take(pageOptionsDTO.take)
    const itemCount = await queryBuilder.getCount();
    let { entities } = await queryBuilder.getRawAndEntities();
    return { entities, itemCount };
  }

}