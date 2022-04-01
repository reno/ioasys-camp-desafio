import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity('files')
export class File {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;
 
  @ApiProperty()
  @Column()
  public url: string;
 
  @ApiProperty()
  @Column()
  public key: string;
}
 
