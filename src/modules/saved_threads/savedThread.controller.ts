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
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PageDTO } from '@shared/dtos/page/page.dto';
import { PageOptionsDTO } from '@shared/dtos/page/pageOptions.dto';
import { ThreadListDTO } from '@shared/dtos/thread/threadList.dto';
import { AuthGuard } from '@nestjs/passport';
import { instanceToInstance } from 'class-transformer';
import { UserFromRequest } from '@shared/decorators/user.decorator';
import { User } from '@shared/entities/user/user.entity';
import { SavedThreadService } from '@modules/saved_threads/savedThread.service';
import { SavedThreadDTO } from '@shared/dtos/saved_thread/savedThread.dto';
import { SavedThread } from '@shared/entities/saved_thread/savedThread.entity';
import { EmailConfirmationGuard } from '@shared/guards/emailConfirmation.guard';


@ApiTags('SavedThreads')
@Controller('saved-threads')
@UseInterceptors(ClassSerializerInterceptor)
export class SavedThreadController {
  constructor(private readonly savedThreadService: SavedThreadService) {}

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), EmailConfirmationGuard)
  public async findByUser(
    @UserFromRequest() user: User,
    @Query() pageOptionsDTO: PageOptionsDTO
  ): Promise<PageDTO<ThreadListDTO>> {
    return await this.savedThreadService.findByUser(user.id, pageOptionsDTO);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), EmailConfirmationGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: SavedThread })
  public async create(@UserFromRequest() user: User, @Body() savedThreadDTO: SavedThreadDTO) {
    const savedThread = await this.savedThreadService.create(user.id, savedThreadDTO);
    return instanceToInstance(savedThread);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), EmailConfirmationGuard)
  async delete(@Param('id') id: string) {
    const savedThread = await this.savedThreadService.remove(id);
    return instanceToInstance(savedThread);
  }
}
