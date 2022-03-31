import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { State } from '@shared/entities/location/state.entity';


@Entity('cities', {
  orderBy: {
      name: "ASC",
  }
})
export class City {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @ManyToOne(() => State, { nullable: false })
  @JoinColumn({ name: 'state_id' })
  @Transform(({ value }) => value.name)
  state: State;

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