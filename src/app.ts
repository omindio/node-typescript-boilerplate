import { Container } from 'typedi';

import Express from '@/loaders/express';
import TypeORM from '@/loaders/typeorm';
import Swagger from '@/loaders/swagger';
import User from '@/api/user';

class App {
  private express: Express;
  private orm: TypeORM;
  private swagger: Swagger;

  constructor() {
    this.express = new Express();
    this.orm = Container.get(TypeORM);
    this.swagger = new Swagger(this.express.app);
  }

  private async apis(): Promise<any> {
    const user = new User(this.express.app);
    await user.init();
  }

  public init(): void {
    this.orm
      .init()
      .then(async () => {
        await this.express.loadMiddlewares();
        await this.apis();
        await this.swagger.init();
        await this.express.init();
      })
      .catch((error) => console.log(error));
  }
}

export default App;
