import {
  Body,
  Controller,
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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '@shared/guards/admin.guard';
import { File } from '@shared/entities/file/file.entity';
import { SubjectService } from '@modules/subjects/subject.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Subject } from '@shared/entities/subject/subject.entity';
import { CreateSubjectDTO } from '@shared/dtos/subject/createSubject.dto';
import { UpdateSubjectDTO } from '@shared/dtos/subject/updateSubject.dto';
import { PageDTO } from '@shared/dtos/page/page.dto';
import { ThreadListDTO } from '@shared/dtos/thread/threadList.dto';
import { SubjectListDTO } from '@shared/dtos/subject/subjectList.dto';
import { ThreadFilterDTO } from '@shared/dtos/filter/threadFilter.dto';
@ApiTags('Subjects')
@Controller('subjects')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  @ApiOkResponse({ type: Subject, isArray: true })
  async findAll() {
    const subjects = await this.subjectService.findAll();
    return await Promise.all(subjects.map(async (subject) => {
      const response = SubjectListDTO.fromEntity(subject);
      response.threadCount = await this.subjectService.getThreadCount(subject.id);
      return response;
    }));
  }

  @Get(':id')
  @ApiOkResponse({ type: Subject })
  async findOne(
    @Param('id') id: string,
    @Query() filters: ThreadFilterDTO,
  ): Promise<PageDTO<ThreadListDTO>> {
    return this.subjectService.findOne(id, filters);
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
  @ApiOkResponse({ type: Subject })
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