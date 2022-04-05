import { EntityRepository, Repository } from "typeorm";
import { Comment } from '@shared/entities/comment/comment.entity'

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {}