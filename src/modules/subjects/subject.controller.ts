import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '@shared/guards/admin.guard';
import { User } from '@shared/entities/user/user.entity';
import { File } from '@shared/entities/file/file.entity';
import { SubjectService } from '@modules/subjects/subject.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserFromRequest } from '@shared/decorators/user.decorator';
import { Subject } from '@shared/entities/subject/subject.entity';
import { CreateSubjectDTO } from '@shared/dtos/subject/createSubject.dto';
import { UpdateSubjectDTO } from '@shared/dtos/subject/updateSubject.dto';
import { PageOptionsDTO } from '@shared/dtos/page/pageOptions.dto';
import { PageDTO } from '@shared/dtos/page/page.dto';
import { ThreadListDTO } from '@shared/dtos/thread/threadList.dto';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  async findAll() {
    const subjects = await this.subjectService.findAll();
    return subjects.map(subject => instanceToInstance(subject));
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() pageOptionsDTO: PageOptionsDTO,
  ): Promise<PageDTO<ThreadListDTO>> {
    return this.subjectService.findOne(id, pageOptionsDTO);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: Subject })
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  public async create(@Body() createSubjectDTO: CreateSubjectDTO) {
    const subject = await this.subjectService.create(createSubjectDTO);
    return instanceToInstance(subject);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(@Param('id') id: string, @Body() updateSubjectDTO: UpdateSubjectDTO,){
    const subject = await this.subjectService.update(id, updateSubjectDTO);
    return instanceToInstance(subject);
  }

  @Post(':id/picture')
  @ApiCreatedResponse({ type: File })
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPicture(@Param('id') subjectId: string, @UploadedFile() file: Express.Multer.File) {
    return this.subjectService.addPicture(subjectId, file.buffer, file.originalname);
  }
}