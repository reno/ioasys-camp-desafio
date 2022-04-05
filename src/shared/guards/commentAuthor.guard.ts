import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { User } from "@shared/entities/user/user.entity";
import { CommentService } from '@modules/comments/comment.service';

@Injectable()
export class CommentAuthorGuard implements CanActivate {
  constructor(private commentService: CommentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    const user: User = request.user;
    const object_id = request.params.id;
    const comment = await this.commentService.findById(request.params.id);
    return comment.user.id === user.id;
  }
}