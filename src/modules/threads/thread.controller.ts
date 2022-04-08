import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDTO } from '@shared/dtos/page/page.dto';
import { PageMetaDTO } from '@shared/dtos/page/meta.dto';
import { PageOptionsDTO } from '@shared/dtos/page/pageOptions.dto';
import { ThreadService } from '@modules/threads/thread.service';
import { ThreadListDTO } from '@shared/dtos/thread/threadList.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateThreadDTO } from '@shared/dtos/thread/createThread.dto';
import { Thread } from '@shared/entities/thread/thread.entity';
import { instanceToInstance } from 'class-transformer';
import { UserFromRequest } from '@shared/decorators/user.decorator';
import { User } from '@shared/entities/user/user.entity';
import { UpdateThreadDTO } from '@shared/dtos/thread/updateThread.dto';
import { ThreadAuthorGuard } from '@shared/guards/threadAuthor.guard';
import { RecentThreadsDTO } from '@shared/dtos/thread/recentThreads.dto';

@ApiTags('Threads')
@Controller('threads')
@UseInterceptors(ClassSerializerInterceptor)
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Get()
  @ApiOperation({ summary: '(Most recent threads from all subjects)' })
  public async findAll(@Query() pageOptionsDTO: PageOptionsDTO): Promise<PageDTO<RecentThreadsDTO>> {
    return await this.threadService.findAll(pageOptionsDTO);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ThreadListDTO> {
    return await this.threadService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Thread })
  @UseGuards(AuthGuard('jwt'))
  public async create(@UserFromRequest() user: User, @Body() createThreadDTO: CreateThreadDTO) {
    const thread = await this.threadService.create(user.id, createThreadDTO);
    return instanceToInstance(thread);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), ThreadAuthorGuard)
  async update(@Param('id') id: string, @Body() updateThreadDTO: UpdateThreadDTO,){
    const thread = await this.threadService.update(id, updateThreadDTO);
    return instanceToInstance(thread);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), ThreadAuthorGuard)
  async delete(@Param('id') id: string) {
    const thread = await this.threadService.remove(id);
    return instanceToInstance(thread);
  }
}