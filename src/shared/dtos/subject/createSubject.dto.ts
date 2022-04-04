import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateSubjectDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
