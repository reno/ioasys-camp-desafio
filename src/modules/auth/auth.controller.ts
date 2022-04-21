import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { LoginDTO } from "@shared/dtos/auth/login.dto";
import { AuthService } from "./auth.service";
import { LoginStatus } from './interfaces/login-status.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login(
      @Body() loginDTO: LoginDTO,
      @Res({ passthrough: true }) response: Response
    ) {
      const data = await this.authService.login(loginDTO);
      response.header('Authorization', data.accessToken);
      return { user: data.user };
    }
}