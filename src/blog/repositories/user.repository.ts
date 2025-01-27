import { IUser } from '../../blog/entities/models/user.interface';
export abstract class UserRepository {
  abstract findAll(limit: number, page: number): Promise<IUser[]>;
  abstract findById(userId: number): Promise<IUser>;
  abstract findByUsername(username: string): Promise<IUser>;
  abstract createUser(user: IUser): Promise<IUser>;
  abstract updateUser(user: IUser): Promise<IUser>;
  abstract deleteUser(user: IUser): Promise<void>;
}
