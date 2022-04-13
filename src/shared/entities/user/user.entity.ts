import { ApiProperty } from '@nestjs/swagger';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { City } from '@shared/entities/location/city.entity';
import { State } from '@shared/entities/location/state.entity';
import { File } from '@shared/entities/file/file.entity';

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

  @ApiProperty()
  @ManyToOne(() => City, { nullable: false })
  @JoinColumn({ name: 'city_id' })
  @Transform(({ value }) => value.name)
  city: City;

  @ApiProperty()
  @ManyToOne(() => State, { nullable: false })
  @JoinColumn({ name: 'state_id' })
  @Transform(({ value }) => value.name)
  state: State;

  @ApiProperty()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @Exclude()
  public role: UserRole;

  @ApiProperty()
  @Column({ name: 'is_active', type: 'boolean', default: false })
  @Exclude()
  public isActive: boolean

  @ApiProperty()
  @JoinColumn({ name: 'avatar_id' })
  @OneToOne(() => File, { eager: true, nullable: true })
  public avatar?: File;

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

  @BeforeInsert()
  async hashPassword() {
    const encryption = new BcryptProvider();
    this.password = await encryption.createHash(this.password);
  }
}
