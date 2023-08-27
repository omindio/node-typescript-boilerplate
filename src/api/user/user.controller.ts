import { Request, Response, NextFunction } from 'express';

import { HttpCode } from '@/lib/exceptions/AppError';
import MissingParameterError from '@/lib/exceptions/MissingParameterError';

import UserService from './user.service';
import { UserDTO } from './user.dto';

export class UserController {
  private service: UserService;
  findOneByUuid = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const uuidParameter = req.params.uuid;

    try {
      if (!uuidParameter) throw new MissingParameterError(['id']);
      const userDTO = new UserDTO({ uuid: uuidParameter });
      const user = await this.service.findByUuid(userDTO);
      res.status(HttpCode.OK).json(user);
    } catch (err) {
      next(err);
    }
  };

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { phone, password } = req.body;
      const userDTO = new UserDTO({ phone, password });
      const user = await this.service.register(userDTO);
      res.status(HttpCode.OK).json(user);
    } catch (err) {
      next(err);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next:NextFunction
  ): Promise<void> => {
    try {

    } catch (err) {
      next(err);
    }
  };

  constructor() {
    this.service = new UserService();
  }
}
