import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectRepository } from '@modules/subjects/repository/subject.repository';
import { SubjectController } from '@modules/subjects/subject.controller';
import { SubjectService } from '@modules/subjects/subject.service';
import { FileRepository } from '@modules/files/repository/file.repository';
import { FilesService } from '@modules/files/files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ SubjectRepository, FileRepository ]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService, FilesService]
})
export class SubjectModule {}
