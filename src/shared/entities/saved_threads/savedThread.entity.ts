import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Thread } from '@shared/entities/thread/thread.entity';
import { User } from '@shared/entities/user/user.entity';


@Entity('saved_threads')
@Unique(['user', 'thread'])
export class SavedThread {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @ManyToOne('User', 'savedThreads')
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ApiProperty()
  @ManyToOne(() => Thread, { nullable: false })
  @JoinColumn({ name: 'thread_id' })
  public thread: Thread;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  public deletedAt: Date;
}
