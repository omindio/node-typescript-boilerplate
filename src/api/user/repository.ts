import { BaseRepository } from '@/core/base/repository';

import { UserDTO } from './dto';
import { IUserRepository } from './interface';
import { UserEntity } from './entity';

export class UserRepository extends BaseRepository implements IUserRepository {
  public findById = async (id: string): Promise<UserDTO> => {
    const User = new UserEntity();
    User.firstName = 'david';
    User.lastName = 'Gonzalez';
    User.email = 'david@omind.io';
    User.password = '213123123';
    console.log(User);

    this.source.save(User);

    return new UserDTO({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: 'ok'
    });
  };

  public findByEmail = async (email: string): Promise<UserDTO> => {
    return new UserDTO({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: 'ok'
    });
  };

  public findByPhone = async (phone: string): Promise<UserDTO> => {
    return new UserDTO({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: 'ok'
    });
  };

  public exists = async (t: UserDTO): Promise<boolean> => {
    return true;
  };

  public save = async (t: UserDTO): Promise<any> => {};

  public delete = async (t: UserDTO): Promise<any> => {};

  constructor() {
    super(UserEntity);
  }
}
