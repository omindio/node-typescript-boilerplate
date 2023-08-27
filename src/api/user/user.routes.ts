import { Router } from 'express';

import { UserController } from './user.controller';

class UserRoutes {
  public readonly routes: Router;
  private controller: UserController;
  constructor() {
    this.routes = Router();
    this.controller = new UserController();

    this.routes.get('/:uuid', this.controller.findOneByUuid);
    this.routes.post('/register', this.controller.register);
  }
}

export const userRoutes = new UserRoutes();
