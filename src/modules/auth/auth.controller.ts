import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "@shared/dtos/auth/login.dto";
import { AuthService } from "./auth.service";
import { LoginStatus } from './interfaces/login-status.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public async login(@Body() loginDTO: LoginDTO): Promise<LoginStatus> {
      return await this.authService.login(loginDTO);
    }


}