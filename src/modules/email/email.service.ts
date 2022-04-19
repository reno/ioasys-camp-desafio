import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import envConfig from '@config/env';
import { EmailConfirmationPayload } from '@modules/email/interfaces/emailConfirmationPayload.interface';
import { UserService } from '@modules/users/user.service';

@Injectable()
export class EmailService {
  private nodemailerService: Mail;
  
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.nodemailerService = createTransport({
      url: envConfig().emailConnectionString, 
      service: envConfig().emailService,
      auth: {
        user: envConfig().emailUser,
        pass: envConfig().emailPassword,
      }
    });
  }

  public sendConfirmationLink(email: string) {
    const payload: EmailConfirmationPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: envConfig().jwtSecret, 
      expiresIn: envConfig().expiresIn,
    });
    return this.nodemailerService.sendMail({
      to: email,
      from: 'tamojunto.work@gmail.com',
      subject: 'Email de confirmação',
      template: 'emailConfirmation',
      context: { token }
    })
  }

  public async resendConfirmationLink(userId: string) {
    const user = await this.userService.findById(userId);
    if (user.isActive) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendConfirmationLink(user.email);
  }
 
  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: envConfig().jwtSecret,
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.findByEmail(email);
    if (user.isActive) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.confirmEmail(email);
  }
}