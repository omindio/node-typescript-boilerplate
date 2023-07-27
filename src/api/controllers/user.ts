import { Request, Response, NextFunction } from 'express';

import UserService from '@services/user';
import { HttpCode } from '@lib/exceptions/AppError';
import MissingParameterError from '@lib/exceptions/MissingParameterError';
import UserDTO from '@dto/user';

class UserController {
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
      const userDTO = await this.service.findOneById(findUserDTO);
      res.status(HttpCode.OK).json(userDTO);
    } catch (err) {
      next(err);
    }
  };

  constructor() {
    this.service = new UserService();
  }
}

export default UserController;
