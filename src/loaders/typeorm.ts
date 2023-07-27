import { DataSource } from 'typeorm';

import { env } from '@/env';

class TypeORM {
  private source: DataSource;
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
      entities: ['@entities/*.ts'],
      subscribers: [],
      migrations: []
    });
  }

  public init(): Promise<DataSource> {
    return this.source.initialize();
  }
}

export default TypeORM;