import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SavedThreadDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public threadId: string;
}
