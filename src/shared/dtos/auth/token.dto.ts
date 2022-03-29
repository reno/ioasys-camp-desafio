import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class TokenDTO {

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}