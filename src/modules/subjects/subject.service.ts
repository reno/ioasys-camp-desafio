import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectRepository } from '@modules/subjects/repository/subject.repository';
import { CreateSubjectDTO } from '@shared/dtos/subject/createSubject.dto';
import { FilesService } from '@modules/files/files.service';
import { UpdateSubjectDTO } from '@shared/dtos/subject/updateSubject.dto';
import { Subject } from '@shared/entities/subject/subject.entity';
import { PageOptionsDTO } from '@shared/dtos/page/pageOptions.dto';
import { ThreadRepository } from '@modules/threads/repository/thread.repository';
import { PageMetaDTO } from '@shared/dtos/page/meta.dto';
import { PageDTO } from '@shared/dtos/page/page.dto';
import { instanceToInstance } from 'class-transformer';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectRepository)
    private readonly subjectRepository: SubjectRepository,
    @InjectRepository(ThreadRepository)
    private readonly threadRepository: ThreadRepository,
    private readonly filesService: FilesService
  ) {}

  async findAll() {
      return await this.subjectRepository.find();
  }

  async findOne(id: string, pageOptionsDTO: PageOptionsDTO) {
    const queryBuilder = this.threadRepository.createQueryBuilder("thread");
    queryBuilder
      .where("thread.subject = :subject", { subject: id })
      .orderBy("thread.createdAt", pageOptionsDTO.order)
      .skip(pageOptionsDTO.skip)
      .take(pageOptionsDTO.take);
    const itemCount = await queryBuilder.getCount();
    let { entities } = await queryBuilder.getRawAndEntities();
    entities = instanceToInstance(entities);
    const pageMetaDto = new PageMetaDTO({ itemCount, pageOptionsDTO });
    return new PageDTO(entities, pageMetaDto);
  }

  async create(createSubjectDTO: CreateSubjectDTO) {
    const subject = await this.subjectRepository.create(createSubjectDTO);
    return await this.subjectRepository.save(subject);
  }

  
  async update(id: string, updateSubjectDTO: UpdateSubjectDTO): Promise<Subject> {
    let subject = await this.subjectRepository.findOne(id);
    if (!subject) {
      throw new HttpException("Subject doesn't exist", HttpStatus.BAD_REQUEST,);
    }
    const data = {
        ...subject,
        ...updateSubjectDTO,
    };
    await this.subjectRepository.update({ id }, data);
    subject = await this.subjectRepository.findOne(id);
    return subject;
  }
  

  async addPicture(subjectId: string, imageBuffer: Buffer, filename: string) {
    const subject = await this.subjectRepository.findOne(subjectId);
    if (subject.picture) {
      await this.subjectRepository.update(subjectId, {
        ...subject,
        picture: null
      });
      await this.filesService.delete(subject.picture.id);
    }
    const picture = await this.filesService.upload(imageBuffer, filename);
    await this.subjectRepository.update(subjectId, {
      ...subject,
      picture
    });
    return picture;
  }

  async deletePicture(subjectId: string) {
    const subject = await this.subjectRepository.findOne(subjectId);
    const fileId = subject.picture?.id;
    if (fileId) {
      await this.subjectRepository.update(subjectId, {
        ...subject,
        picture: null
      });
      await this.filesService.delete(fileId)
    }
  }

}
