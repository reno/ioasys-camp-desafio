import { EntityRepository, Repository } from "typeorm";
import { Thread } from '@shared/entities/thread/thread.entity'
import { ThreadFilterDTO } from "@shared/dtos/filter/threadFilter.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CityRepository } from "@modules/location/repository/city.repository";
import { PageOptionsDTO } from "@shared/dtos/page/pageOptions.dto";

@EntityRepository(Thread)
export class ThreadRepository extends Repository<Thread> {

  constructor(
    @InjectRepository(CityRepository)
    private readonly cityRepository: CityRepository,
  ) { super(); }

  async findAllAndCount(pageOptionsDTO: PageOptionsDTO) {
    const queryBuilder = this.createQueryBuilder("thread");
    queryBuilder
      .leftJoinAndSelect('thread.user', 'user')
      .leftJoinAndSelect('thread.subject', 'subject')
      .orderBy("thread.createdAt", "DESC")
      .skip(pageOptionsDTO.skip)
      .take(pageOptionsDTO.take);
    const itemCount = await queryBuilder.getCount();
    let { entities } = await queryBuilder.getRawAndEntities();
    return { entities, itemCount };
  }

  async findBySubjectWithFiltersAndCount(id: string, filters: ThreadFilterDTO) {
    const queryBuilder = this.createQueryBuilder('thread');
    queryBuilder
      .leftJoinAndSelect('thread.user', 'user')
      .where('thread.subject = :subject', { subject: id })
    if (filters.createdAfter) {
      const date = new Date(filters.createdAfter).toISOString();
      queryBuilder.andWhere('thread.createdAt >= :date', { date });
    }
    if (filters.city) {
      const city = await this.cityRepository.findOne({
        where: {
          name: filters.city
        }
      });
      queryBuilder.andWhere('user.city = :city', { city: city.id })
    }
    queryBuilder.orderBy('thread.createdAt', filters.order)
    queryBuilder.skip(filters.skip).take(filters.take)
    const itemCount = await queryBuilder.getCount();
    let { entities } = await queryBuilder.getRawAndEntities();
    return { entities, itemCount };
  }

  async findByQueryAndCount(query: string, pageOptionsDTO: PageOptionsDTO) {
    let queryBuilder = await this.createQueryBuilder('thread')
      .leftJoinAndSelect('thread.subject', 'subject')
      .leftJoinAndSelect('thread.user', 'user')
      .leftJoin('thread.comments', 'comments')
      .where(`to_tsvector(thread.title) @@ to_tsquery(:query)`, { query })
      .orWhere(`to_tsvector(thread.content) @@ to_tsquery(:query)`, { query })
      .orWhere(`to_tsvector(comments.content) @@ to_tsquery(:query)`, { query })
      .orderBy('thread.createdAt', pageOptionsDTO.order)
    const itemCount = await queryBuilder.getCount();
    let { entities } = await queryBuilder.getRawAndEntities();
    return { entities, itemCount };
  }
}