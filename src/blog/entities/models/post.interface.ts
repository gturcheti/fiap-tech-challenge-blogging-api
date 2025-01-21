import { IPerson } from './person.interface';

export interface IPost {
  id?: number;
  author: IPerson;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}
