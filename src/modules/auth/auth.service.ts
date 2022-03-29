import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '@shared/dtos/auth/login.dto';
import { UserService } from '@modules/users/user.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { User } from '@shared/entities/user/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<LoginStatus> {
    const user = await this.userService.findByLogin(loginDTO);  
    const token = this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser({ userId }: JwtPayload): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ id }: User): any {
    const expiresIn = process.env.EXPIRES_IN || '1d';
    const payload: JwtPayload = { userId: id };
    const accessToken = this.jwtService.sign(payload);
    return { expiresIn, accessToken };
  }
}