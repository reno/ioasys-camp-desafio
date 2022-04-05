import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Thread } from '@shared/entities/thread/thread.entity';
import { User } from '@shared/entities/user/user.entity';

@Entity('comments', {
  orderBy: {
    createdAt: "ASC",
  }
})
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  public content: string;

  @ApiProperty({ type: () => Thread })
  @ManyToOne(() => Thread, { nullable: false })
  @JoinColumn({ name: 'thread_id' })
  @Transform(({ value }) => value.id)
  public thread: Thread;

  @ApiProperty()
  @ManyToOne(() => User, { eager: true, nullable: false })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ApiProperty()
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