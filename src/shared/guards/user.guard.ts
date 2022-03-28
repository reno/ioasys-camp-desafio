import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { User } from "@shared/entities/user/user.entity";

@Injectable()
export class UserGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    const user: User = request.user;
    const object_id = request.params.id;
    return user.id === object_id;
  }
}