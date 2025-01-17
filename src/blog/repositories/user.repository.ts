import { IUser } from '../../blog/entities/models/user.interface';
export abstract class UserRepository {
  abstract findById(userId: number): Promise<IUser>;
  abstract findAll(limit: number, page: number): Promise<IUser[]>;
  abstract createUser(user: IUser): Promise<IUser>;
  abstract updateUser(existingUser: IUser, user: IUser): Promise<IUser>;
  abstract deleteUser(user: IUser): Promise<void>;
}
