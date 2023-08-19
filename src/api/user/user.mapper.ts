import { BaseMapper } from '@/core/base/mapper';

import { UserDTO, userType } from './user.dto';
import { UserEntity } from './user.entity';

export class UserMapper extends BaseMapper<UserEntity> {
  // TODO: FIX param type -> static toDTO(userEntity: UserEntity): UserDTO {
  static toDTO(userEntity: any): UserDTO {
    const userDTO = new UserDTO(userEntity as userType);
    return userDTO;
  }
}
