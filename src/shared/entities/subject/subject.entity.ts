import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { File } from '@shared/entities/file/file.entity';
import { Thread } from '@shared/entities/thread/thread.entity'

@Entity('subjects', {
  orderBy: {
      name: "ASC",
  }
})
export class Subject {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @ApiProperty()
  @JoinColumn({ name: 'picture_id' })
  @OneToOne(() => File, { eager: true, nullable: true })
  public picture: File;

  @ApiProperty()
  @OneToMany(() => Thread, (thread) => thread.subject)
  public threads: Thread[];

  @ApiProperty()
  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  public updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  public deletedAt: Date;

}