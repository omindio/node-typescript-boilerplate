import { DataSource } from 'typeorm';
import { Service } from 'typedi';

import { env } from '@/env';
import { Loader } from '@/core/interfaces/loader';
import { UserEntity } from '@/api/user/user.entity';

@Service()
class TypeORM implements Loader {
  public source: DataSource;
  init = async (): Promise<any> => {
    return this.source
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized');
      })
      .catch((error) => console.log(error));
  };

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
}

export default TypeORM;
