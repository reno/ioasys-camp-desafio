import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { EmailService } from '@modules/email/email.service';
import { ConfirmEmailDTO } from '@shared/dtos/email/confirmEmail.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserFromRequest } from '@shared/decorators/user.decorator';
import { User } from '@shared/entities/user/user.entity';
 
@Controller('email')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailController {
  constructor(
    private readonly emailService: EmailService
  ) {}
 
  @Post('confirmation')
  async emailConfirmation(@Body() payload: ConfirmEmailDTO) {
    const email = await this.emailService.decodeConfirmationToken(payload.token);
    await this.emailService.confirmEmail(email);
  }

  @Get('resend-confirmation-link')
  @UseGuards(AuthGuard('jwt'))
  async resendConfirmationLink(@UserFromRequest() user: User) {
    await this.emailService.resendConfirmationLink(user.id);
    return { message: 'Confirmation link sent' };
  }
}