import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCommentDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public threadId: string;
}
