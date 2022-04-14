import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('business_types', {
  orderBy: {
      name: "ASC",
  }
})
export class BusinessType {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public name: string;

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