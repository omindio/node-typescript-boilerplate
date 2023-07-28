import Express from '@loaders/express';
import TypeORM from '@loaders/typeorm';
import Swagger from '@loaders/swagger';

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
    this.express.init();
    this.swagger.init();
  }

  public init(): any {
    this.orm
      .init()
      .then(() => {
        this.loaders();
      })
      .catch((error) => console.log(error));
  }
}

export default App;
