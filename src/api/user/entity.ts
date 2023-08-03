import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  isVerified: boolean;

  @Column()
  phone: string;

  @Column()
  role: string;
}
