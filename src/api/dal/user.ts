import UserDTO from '@dto/user';
import MissingParameterError from '@lib/exceptions/MissingParameterError';

class UserDAL {
  public findOneById = async (userDTO: UserDTO): Promise<UserDTO> => {
    return new UserDTO({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: 'ok'
    });
  };

  constructor() {}
}

export default UserDAL;
