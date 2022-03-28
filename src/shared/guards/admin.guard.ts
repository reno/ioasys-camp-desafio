import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { User, UserRole } from "@shared/entities/user/user.entity";

@Injectable()
export class AdminGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    const user: User = request.user;
    return user.role === UserRole.ADMIN;
  }
}