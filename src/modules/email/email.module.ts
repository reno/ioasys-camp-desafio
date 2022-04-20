import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import envConfig from '@config/env';
import { EmailService } from '@modules/email/email.service';
import { EmailController } from '@modules/email/email.controller';
import { UserService } from '@modules/users/user.service';
import { UserModule } from '@modules/users/user.module';
 
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRE_IN,
      },
    }),
    forwardRef(() => UserModule)
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}