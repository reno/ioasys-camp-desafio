import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDTOParameters } from '@shared/interfaces/page/pageMetaDTOParameters.interface';

export class PageMetaDTO {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDTO, itemCount }: PageMetaDTOParameters) {
    this.page = pageOptionsDTO.page;
    this.take = pageOptionsDTO.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}