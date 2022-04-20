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
      secure: false,
      auth: {
        user: envConfig().emailUser,
        pass: envConfig().emailPassword,
      }
    });
  }

  public sendConfirmationLink(email: string) {
    const payload: EmailConfirmationPayload = { email };
    const token = this.jwtService.sign(payload);
    const url = `http://localhost:8000/email-confirmation/?token=${token}`;
    const html = `<p>Olá,<br>
    <br>
    Estamos felizes por ter você na tamojunto, a sua comunidade empreendedora 😉<br>
    Para confirmar seu cadastro e acessar a plataforma, por favor acesse o link abaixo:<br>
    <br>
    ${url}<br>
    <br>
    Nos vemos do outro lado,<br>
    Equipe tamojunto.</p>`;
    return this.nodemailerService.sendMail({
      to: email,
      from: 'tamojunto.work@gmail.com',
      subject: 'Confirme seu cadastro na tamojunto',
      html,
    })
  }

  public async resendConfirmationLink(userId: string) {
    const user = await this.userService.findById(userId);
    if (user.isActive) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendConfirmationLink(user.email);
  }
 
  public async decodeToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      if (typeof payload === 'object' && 'email' in payload) {
        console.log(payload);
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

  public async sendPasswordRecoverLink(email: string) {
    const payload: EmailConfirmationPayload = { email };
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1d' });
    const url = `http://localhost:8000/password-reset/?token=${token}`;
    const html = `<p>Olá,<br>
    <br>
    Recebemos seu pedido para redefinir a senha da sua conta na tamojunto.<br>
    <br>
    Para escolher uma nova senha de acesso, por favor acesse o link abaixo:<br>
    <br>
    ${url}<br>
    <br>
    Caso não tenha sido você, ignore o link e não vai acontecer nada. Sua conta está segura, mas atenção! Alguém pode estar tentando se passar por você.<br>
    <br>
    Talvez seja uma boa ideia trocar a senha só por precaução 😉<br>
    <br>
    Equipe tamojunto.</p>`;
    return this.nodemailerService.sendMail({
      to: email,
      from: 'tamojunto.work@gmail.com',
      subject: 'Redefinição de senha na tamojunto',
      html,
    })
  }

  public async passwordRecover(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userService.updatePassword(user.id, password);
  
  }
}