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
    this.orm = new TypeORM();
    this.swagger = new Swagger(this.express.app);
  }

  private loaders(): void {
    this.swagger.init();
    this.express.loadRoutes();
    this.express.loadMiddlewares();
    this.express.init();
  }

  private async apis(): Promise<any> {
    const user = new User(this.express.app);
    await user.init();
  }

  public init(): void {
    this.orm
      .init()
      .then(async () => {
        await this.apis();
        await this.loaders();
      })
      .catch((error) => console.log(error));
  }
}

export default App;
