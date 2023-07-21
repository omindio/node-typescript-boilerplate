import { Request, Response, NextFunction } from 'express';

import UserService from '@services/user';

class UserController {
  private service: UserService;
  constructor() {
    this.service = new UserService();
  }

  public findOneById(req: Request, res: Response, next: NextFunction) {
    try {
        // this.service.findOneById();    
    } catch (err) {
        next(err);
    }
  }
}

export default UserController;
