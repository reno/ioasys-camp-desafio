import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectRepository } from '@modules/subjects/repository/subject.repository';
import { CreateSubjectDTO } from '@shared/dtos/subject/createSubject.dto';
import { FilesService } from '@modules/files/files.service';
import { UpdateSubjectDTO } from '@shared/dtos/subject/updateSubject.dto';
import { Subject } from '@shared/entities/subject/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectRepository)
    private readonly subjectRepository: SubjectRepository,
    private readonly filesService: FilesService
  ) {}

  async findAll() {
      return await this.subjectRepository.find();
    }

  async findById(id: string) {
      return await this.subjectRepository.findOne(id);
    }

  async create(createSubjectDTO: CreateSubjectDTO) {
      const subject = await this.subjectRepository.create(createSubjectDTO);
      return await this.subjectRepository.save(subject);
    }

  async update(id: string, updateSubjectDTO: UpdateSubjectDTO): Promise<Subject> {
    let subject = await this.findById(id);
    if (!subject) {
      throw new HttpException("Subject doesn't exist", HttpStatus.BAD_REQUEST,);
    }
    const data = {
        ...subject,
        ...updateSubjectDTO,
    };
    await this.subjectRepository.update({ id }, data);
    subject = await this.subjectRepository.findOne({ where: { id } });
    return subject;
  }

  async addPicture(subjectId: string, imageBuffer: Buffer, filename: string) {
    const subject = await this.findById(subjectId);
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
    const subject = await this.findById(subjectId);
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
