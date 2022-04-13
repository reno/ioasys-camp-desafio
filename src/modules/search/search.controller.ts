import { Controller, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SearchService } from '@modules/search/search.service';
import { ThreadService } from "@modules/threads/thread.service";
import { PageOptionsDTO } from "@shared/dtos/page/pageOptions.dto";

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(
    private searchService: SearchService,
  ) {}

  @Post()
  async find(@Query('query') query: string, @Query() pageOptionsDTO: PageOptionsDTO) {
    return this.searchService.find(query, pageOptionsDTO);
  }
}
