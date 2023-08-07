import { Request, Response, NextFunction } from 'express';

import { HttpCode } from '@/lib/exceptions/AppError';
import MissingParameterError from '@/lib/exceptions/MissingParameterError';

import UserService from './service';
import { UserDTO } from './dto';

export class UserController {
  private service: UserService;
  public findOneById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const idParameter = req.params.id;

    try {
      if (!idParameter) throw new MissingParameterError(['id']);
      const findUserDTO = new UserDTO({ id: idParameter });
      const userDTO = await this.service.findById(findUserDTO);
      res.status(HttpCode.OK).json(userDTO);
    } catch (err) {
      next(err);
    }
  };

  constructor() {
    this.service = new UserService();
  }
}
