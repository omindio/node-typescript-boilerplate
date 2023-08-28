import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '@/api/user/user.entity';
import { BasePostgresEntity } from '@/core/base/postgresEntity';

@Entity('tokens')
export class TokenEntity extends BasePostgresEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  token: string;

  @Column()
  createdAt: string;

  @Column()
  type: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
