import { Container } from 'typedi';
import { Repository, Entity, EntityTarget } from 'typeorm';

import TypeORM from '@/loaders/typeorm';

export class BaseRepository {
  public source: Repository<typeof Entity>;
  public orm: TypeORM;
  constructor(entity: EntityTarget<typeof Entity>) {
    this.orm = Container.get(TypeORM);
    this.source = this.orm.source.getRepository(entity);
  }
}
