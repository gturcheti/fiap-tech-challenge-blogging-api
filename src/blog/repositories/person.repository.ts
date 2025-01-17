import { IPerson } from '../entities/models/person.interface';

export abstract class PersonRepository {
  abstract findById(personId: number): Promise<IPerson>;
  abstract findAll(limit: number, page: number): Promise<IPerson[]>;
  abstract createPerson(person: IPerson): Promise<IPerson>;
  abstract updatePerson(
    existingPerson: IPerson,
    person: IPerson,
  ): Promise<IPerson>;
  abstract deletePerson(person: IPerson): Promise<void>;
}
