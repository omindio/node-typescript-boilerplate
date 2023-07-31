import { AppError, HttpCode } from '@lib/exceptions/AppError';
import UserDTO from '@dto/user';
import UserDAL from '@dal/user';
import QueryNotFoundError from '@lib/exceptions/QueryNotFoundError';
import ValidationError from '@lib/exceptions/ValidationSchemaError';

import UserValidation from '../validation/user';

class UserService {
  private dal: UserDAL;
  private validate: UserValidation;

  public findOneById = async (userDTOParam: UserDTO): Promise<UserDTO> => {
    const { error } = await this.validate.findOneById(userDTOParam);
    if (error) {
      throw new ValidationError(error);
    }

    const userDTOFound = await this.dal.findOneById(userDTOParam);
    if (!userDTOFound) throw new QueryNotFoundError('User not found.');

    return Object.assign(
      Object.create(Object.getPrototypeOf(userDTOFound)),
      userDTOFound,
      {
        password: undefined
      }
    );
  };

  constructor() {
    this.dal = new UserDAL();
    this.validate = new UserValidation();
  }
}

export default UserService;

/*
throw new AppError({
  httpCode: HttpCode.INTERNAL_SERVER_ERROR,
  description: 'ERROR'
});
*/
