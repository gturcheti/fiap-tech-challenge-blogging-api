import { IUser } from '../entities/models/user.interface';
import { BaseRepository } from './base.repository';

export abstract class UserRepository extends BaseRepository<IUser> {}
