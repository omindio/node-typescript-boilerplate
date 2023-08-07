import { DataSource } from 'typeorm';

import { env } from '@/env';
import { Loader } from '@/core/interfaces/loader';
import { UserEntity } from '@/api/user/entity';

class TypeORM implements Loader {
  public source: DataSource;
  constructor() {
    this.source = new DataSource({
      type: env.db.type as any,
      url: env.db.url,
      host: env.db.host,
      port: env.db.port,
      username: env.db.username,
      password: env.db.password,
      database: env.db.database,
      synchronize: true,
      logging: true,
      entities: [UserEntity],
      subscribers: [],
      migrations: []
    });
  }

  init = async (): Promise<any> => {
    return this.source.initialize().then(() => {console.log('Data Source has been initialized')}).catch((error) => console.log(error));
  }
}

export default TypeORM;
