import { EntityRepository, Repository } from "typeorm";
import { Thread } from '@shared/entities/thread/thread.entity'

@EntityRepository(Thread)
export class ThreadRepository extends Repository<Thread> {}