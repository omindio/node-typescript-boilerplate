import { BaseRepository } from '@/core/base/repository';
import QueryNotFoundError from '@/lib/exceptions/QueryNotFoundError';
import { AppError, HttpCode } from '@/lib/exceptions/AppError';

import { UserMapper } from './user.mapper';
import { IUserRepository } from './user.interface';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';

export class UserRepository extends BaseRepository implements IUserRepository {
  findByUuid = async (uuid: string): Promise<UserDTO> => {
    const user = await this.source.findOne({ where: { uuid } });
    if (!user) throw new QueryNotFoundError('User not found.');

    const userDTO = UserMapper.toDTO(user);
    return userDTO;
  };

  exists = async (userDTO: UserDTO): Promise<boolean> => {
    const user = await this.source.find({
      where: [
        { uuid: userDTO.uuid },
        { email: userDTO.email },
        { phone: userDTO.phone }
      ]
    });

    if (user.length) {
      return true;
    } else {
      return false;
    }
  };

  create = async (userDTO: UserDTO): Promise<any> => {
    const exists = await this.exists(userDTO);
    if (exists) {
      throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: 'User email, phone or id already exists.'
      });
    } else {
      await this.source.save(userDTO);
      return userDTO;
    }
  };

  update = async (uuid: string, userDTO: UserDTO): Promise<any> => {};

  delete = async (userDTO: UserDTO): Promise<any> => {};

  constructor() {
    super(UserEntity);
  }
}
