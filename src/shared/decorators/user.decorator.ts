import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserFromRequest = createParamDecorator(
  (ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  },
);