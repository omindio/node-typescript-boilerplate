import { Router } from 'express';

import { UserController } from './controller';

class UserRoutes {
  public readonly routes: Router;
  private controller: UserController;
  constructor() {
    this.routes = Router();
    this.controller = new UserController();

    this.routes.get('/:id', this.controller.findOneById);
  }
}

export const userRoutes = new UserRoutes();
