import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import ValidationError from '@/lib/exceptions/ValidationSchemaError';

import { UserDTO, Roles } from './user.dto';
import { UserRepository } from './user.repository';
import { UserValidation } from './user.validation';

class UserService {
  private repository: UserRepository;
  private validate: UserValidation;
  private passwordSalt: number = 10;

  findByUuid = async (userDTOParam: UserDTO): Promise<UserDTO> => {
    const { error } = await this.validate.findOneByUuid(userDTOParam);

    if (error) throw new ValidationError(error);

    const user = await this.repository.findByUuid(userDTOParam.uuid as string);

    return Object.assign(Object.create(Object.getPrototypeOf(user)), user, {
      password: undefined
    });
  };

  registerByPhone = async (userDTOParam: UserDTO): Promise<UserDTO> => {
    const { error } = await this.validate.register(userDTOParam);

    if (error) throw new ValidationError(error);

    const salt = await bcrypt.genSalt(this.passwordSalt);
    const hash = await bcrypt.hash(userDTOParam.password as string, salt);

    const userDTO = Object.assign(
      Object.create(Object.getPrototypeOf(userDTOParam)),
      userDTOParam,
      {
        uuid: uuidv4(),
        password: hash,
        isVerified: false,
        isActive: false,
        twoFaEnabled: false,
        role: Roles.User
      }
    );

    const user = await this.repository.create(userDTO);
    return Object.assign(Object.create(Object.getPrototypeOf(user)), user, {
      password: undefined
    });
  };

  login = async () => {};

  constructor() {
    this.repository = new UserRepository();
    this.validate = new UserValidation();
  }
}

export default UserService;
