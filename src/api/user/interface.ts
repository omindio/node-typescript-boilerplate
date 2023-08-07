import { Repository } from '@/core/interfaces/repository';

import { UserDTO } from './dto';

export interface IUserRepository extends Repository<UserDTO> {
  findByEmail(email: string): Promise<UserDTO>;
  findByPhone(phone: string): Promise<UserDTO>;
}
