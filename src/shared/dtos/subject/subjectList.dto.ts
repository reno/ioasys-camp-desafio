import { ApiProperty } from '@nestjs/swagger';
import { File } from '@shared/entities/file/file.entity'
import { Subject } from '@shared/entities/subject/subject.entity';

export class SubjectListDTO {

  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public picture: File;

  @ApiProperty()
  public threadCount: number;

  static fromEntity(subject: Subject): SubjectListDTO {
    const dto = new SubjectListDTO();
    dto.id = subject.id;
    dto.name = subject.name;
    dto.picture = subject.picture;
    dto.threadCount = null;
    return dto;
  }
}
