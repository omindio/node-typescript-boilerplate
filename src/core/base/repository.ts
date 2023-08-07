import { Repository, Entity, EntityTarget } from 'typeorm';

import TypeORM from '@/loaders/typeorm';

export class BaseRepository {
  public source: Repository<typeof Entity>;
  public orm: TypeORM;
  constructor(entity: EntityTarget<typeof Entity>) {
    this.orm = new TypeORM();
    // this.orm.init();
    this.source = this.orm.source.getRepository(entity);
  }
}
