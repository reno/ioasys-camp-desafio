import { ApiProperty } from '@nestjs/swagger';
import { Thread } from '@shared/entities/thread/thread.entity';
import { User } from '@shared/entities/user/user.entity';
import { Comment } from '@shared/entities/comment/comment.entity';
import { instanceToInstance } from 'class-transformer';

export class ThreadDetailDTO {

  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public user: User;

  @ApiProperty()
  public comments: Comment[];

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public commentCount: number;

  static fromEntity(thread: Thread): ThreadDetailDTO {
    const dto = new ThreadDetailDTO();
    dto.id = thread.id;
    dto.title = thread.title;
    dto.content = thread.content;
    dto.user = instanceToInstance(thread.user);
    dto.comments = thread.comments;
    dto.createdAt = thread.createdAt;
    dto.commentCount = null;
    return dto;
  }
}