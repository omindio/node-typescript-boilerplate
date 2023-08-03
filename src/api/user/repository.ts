import MissingParameterError from '@/lib/exceptions/MissingParameterError';

import UserDTO from './dto';

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
