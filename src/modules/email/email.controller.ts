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
import { PasswordRecoverDTO } from '@shared/dtos/email/passwordRecover.dto';
 
@Controller('email')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailController {
  constructor(
    private readonly emailService: EmailService
  ) {}
 
  @Post('confirmation')
  async emailConfirmation(@Body() payload: ConfirmEmailDTO) {
    const email = await this.emailService.decodeToken(payload.token);
    await this.emailService.confirmEmail(email);
    return { message: 'Email confirmed successfully' };
  }

  @Get('resend-confirmation-link')
  @UseGuards(AuthGuard('jwt'))
  async resendConfirmationLink(@UserFromRequest() user: User) {
    await this.emailService.resendConfirmationLink(user.id);
    return { message: 'Confirmation link sent' };
  }

  @Post('password-recover-link')
  async passwordRecoverLink(@Body('email') email: string) {
    await this.emailService.sendPasswordRecoverLink(email);
    return { message: 'Password recover link sent' };
  }

  @Post('password-recover')
  async passwordRecover(@Body() payload: PasswordRecoverDTO, @Body('password') password: string) {
    const email = await this.emailService.decodeToken(payload.token);
    await this.emailService.passwordRecover(email, password);
    return { message: 'Password changed successfully' };
  }
}