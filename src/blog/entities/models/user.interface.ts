import { IPerson } from './person.interface';

export interface IUser {
  id?: number;
  username: string;
  password: string;
  person?: IPerson;
}
