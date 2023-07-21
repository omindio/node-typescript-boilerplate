import { AppError, HttpCode } from '@lib/exceptions/AppError';

class UserService {
  constructor() {}

  public findOneById() {
    console.log('OK');
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: 'ERROR'
    });
  }
}

export default UserService;
