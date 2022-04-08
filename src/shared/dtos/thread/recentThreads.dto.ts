import { ApiProperty } from '@nestjs/swagger';
import { Thread } from '@shared/entities/thread/thread.entity';
import { User } from '@shared/entities/user/user.entity';
import { instanceToInstance } from 'class-transformer';

export class RecentThreadsDTO {

  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public subject: string;

  @ApiProperty()
  public user: User;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public commentCount: number;

  static fromEntity(thread: Thread): RecentThreadsDTO {
    const dto = new RecentThreadsDTO();
    dto.id = thread.id;
    dto.title = thread.title;
    dto.content = thread.content;
    dto.subject = thread.subject.name;
    dto.user = instanceToInstance(thread.user);
    dto.createdAt = thread.createdAt;
    dto.commentCount = null;
    return dto;
  }
}