import { Repository } from '@/core/interfaces/repository';

import { UserDTO } from './user.dto';

export interface IUserRepository extends Repository<UserDTO> {}
