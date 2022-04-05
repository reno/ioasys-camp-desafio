import { EntityRepository, Repository } from "typeorm";
import { Subject } from '@shared/entities/subject/subject.entity'
import { CreateSubjectDTO } from "@shared/dtos/subject/createSubject.dto";

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {}