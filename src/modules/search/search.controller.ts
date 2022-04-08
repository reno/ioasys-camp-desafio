import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SearchService } from '@modules/search/search.service';
import { ThreadListDTO } from "@shared/dtos/thread/threadList.dto";
import { ThreadService } from "@modules/threads/thread.service";
import { PageOptionsDTO } from "@shared/dtos/page/pageOptions.dto";
import { PageDTO } from "@shared/dtos/page/page.dto";


@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(
    private searchService: SearchService,
    private threadService: ThreadService,
  ) {}

  @Post()
  async find(
    @Query('query') query: string,
    @Query() pageOptionsDTO: PageOptionsDTO
  ) {
    return this.searchService.find(query, pageOptionsDTO);
  }
}
