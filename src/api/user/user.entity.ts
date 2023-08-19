import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  isVerified: boolean;

  @Column()
  twoFaEnabled: boolean;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column()
  role: string;
}
