import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UserFromRequest } from '@shared/decorators/user.decorator';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user?.isActive) {
      throw new UnauthorizedException('Confirm your email first');
    }
    return true;
  }
}