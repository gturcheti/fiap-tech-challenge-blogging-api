import { IPerson } from '../entities/models/person.interface';
import { BaseRepository } from './base.repository';

export abstract class PersonRepository extends BaseRepository<IPerson> {}
