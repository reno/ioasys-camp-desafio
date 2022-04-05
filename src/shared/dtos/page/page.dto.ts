import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetaDTO } from '@shared/dtos/page/meta.dto';

export class PageDTO<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDTO })
  readonly meta: PageMetaDTO;

  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}