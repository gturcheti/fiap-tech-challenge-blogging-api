import { EntityRepository } from 'typeorm';
import { User } from 'src/blog/entities/users.entity';
import { BasePGRepository } from './base.pg.repository';
import { UserRepository } from '../user.repository';

@EntityRepository(User)
export class UserPGRepository
  extends BasePGRepository<User>
  implements UserRepository {}
