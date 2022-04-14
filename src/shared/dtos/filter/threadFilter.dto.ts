import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageOptionsDTO } from '@shared/dtos/page/pageOptions.dto';
import { IsOptional } from 'class-validator';

export class ThreadFilterDTO extends PageOptionsDTO {
  
  @ApiPropertyOptional()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  createdAfter?: Date;
}