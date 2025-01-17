import { IPerson } from './person.interface';

export interface IPost {
  id?: string | undefined;
  author: IPerson;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
