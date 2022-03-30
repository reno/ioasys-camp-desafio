import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { City } from '@shared/entities/location/city.entity';


@Entity('states', {
  orderBy: {
      name: "ASC",
  }
})
export class State {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @OneToMany(() => City, (city) => city.state)
  public cities: City[];

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