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
import { Subject } from '@shared/entities/subject/subject.entity';
import { User } from '@shared/entities/user/user.entity';

@Entity('threads', {
  orderBy: {
    createdAt: "DESC",
  }
})
export class Thread {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  public title: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  public content: string;

  @ApiProperty()
  @ManyToOne(() => Subject, { nullable: false })
  @JoinColumn({ name: 'subject_id' })
  @Transform(({ value }) => value.name)
  public subject: Subject;

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