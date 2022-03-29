import { ApiProperty } from '@nestjs/swagger';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
//import { City } from '@shared/entities/location/city.entity';
//import { State } from '@shared/entities/location/state.entity';


export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({ unique: true })
  public email: string;

  @ApiProperty()
  @Column()
  @Exclude()
  public password: string;

  @ApiProperty()
  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  public firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  public lastName: string;

  @ApiProperty()
  @Column({ name: 'business_name', type: 'varchar', nullable: false })
  public businessName: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true, nullable: false })
  public cnpj: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  public phone: string;

  /*
  @ApiProperty()
  @ManyToOne(() => State)
  @JoinColumn({ name: 'city_id' })
  //@Transform(({ value }) => value.name)
  city: State;

  
  @ApiProperty()
  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  //@Transform(({ value }) => value.name)
  state: State;
  */

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  public role: UserRole;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  public isActive: boolean

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

  @BeforeInsert()
  async hashPassword() {
    const encryption = new BcryptProvider();
    this.password = await encryption.createHash(this.password);
  }
}
