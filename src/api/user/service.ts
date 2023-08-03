// import { AppError, HttpCode } from '@/lib/exceptions/AppError';
import QueryNotFoundError from '@/lib/exceptions/QueryNotFoundError';
import ValidationError from '@/lib/exceptions/ValidationSchemaError';

import UserDTO from './dto';
import UserRepository from './repository';
import UserValidation from './validation';

class UserService {
  private repository: UserRepository;
  private validate: UserValidation;

  public findOneById = async (userDTOParam: UserDTO): Promise<UserDTO> => {
    const { error } = await this.validate.findOneById(userDTOParam);

    if (error) {
      throw new ValidationError(error);
    }

    const userDTOFound = await this.repository.findOneById(userDTOParam);
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
    this.repository = new UserRepository();
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
