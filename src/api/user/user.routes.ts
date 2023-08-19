import { Router } from 'express';

import { UserController } from './user.controller';

class UserRoutes {
  public readonly routes: Router;
  private controller: UserController;
  constructor() {
    this.routes = Router();
    this.controller = new UserController();

    this.routes.get('/:uuid', this.controller.findOneByUuid);
    this.routes.post('/register-by-email', this.controller.registerByEmail);
    this.routes.post('/register-by-phone', this.controller.registerByPhone);
  }
}

export const userRoutes = new UserRoutes();
