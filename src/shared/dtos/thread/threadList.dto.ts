import { ApiProperty } from '@nestjs/swagger';
import { User } from '@shared/entities/user/user.entity';

export class ThreadListDTO {

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public content: string;

  @ApiProperty()
  public user: User;

  @ApiProperty()
  public createdAt: Date;

  //@ApiProperty()
  //public commentCount: number;
}