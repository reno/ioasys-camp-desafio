import { EntityRepository, Repository } from "typeorm";
import { Subject } from '@shared/entities/subject/subject.entity'

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {}