import { ThreadService } from "@modules/threads/thread.service";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { User } from "@shared/entities/user/user.entity";

@Injectable()
export class ThreadAuthorGuard implements CanActivate {
  constructor(private threadService: ThreadService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    const user: User = request.user;
    const object_id = request.params.id;
    const thread = await this.threadService.findById(request.params.id);
    return thread.user.id === user.id;
  }
}