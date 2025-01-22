import { IPerson } from '../entities/models/person.interface';

export abstract class PersonRepository {
  abstract findAll(limit: number, page: number): Promise<IPerson[]>;
  abstract findById(personId: number): Promise<IPerson>;
  abstract createPerson(person: IPerson): Promise<IPerson>;
  abstract updatePerson(person: IPerson): Promise<IPerson>;
  abstract deletePerson(person: IPerson): Promise<void>;
}
