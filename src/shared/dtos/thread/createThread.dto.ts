import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateThreadDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public subjectId: string;
}
