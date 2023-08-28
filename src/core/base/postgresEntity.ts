import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BasePostgresEntity {
  @PrimaryGeneratedColumn()
  id: number
}
