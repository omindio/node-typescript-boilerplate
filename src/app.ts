import Express from '@loaders/express';
import TypeORM from '@loaders/typeorm';

class App {
  private express: Express;
  private orm: TypeORM;

  constructor() {
    this.express = new Express();
    this.orm = new TypeORM();
  }

  private loaders(): void {
    this.express.init();
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
