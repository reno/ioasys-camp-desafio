import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDTO {

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(
    (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*=(+){}|'";\\:[><.\],?/-]).{8,}$/),
    { message: 'password-is-too-weak' }
  )
  public password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName: string;
 
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public businessName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches((/^\d{14}$/), { message: 'invalid-cnpj' })
  public cnpj: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public phone: string;

  /*
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public city_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public state_id: string;
  */
}
