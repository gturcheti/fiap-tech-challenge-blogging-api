import { EntityRepository } from 'typeorm';
import { Person } from 'src/blog/entities/person.entity';
import { BasePGRepository } from './base.pg.repository';
import { PersonRepository } from '../person.repository';

@EntityRepository(Person)
export class PersonPGRepository
  extends BasePGRepository<Person>
  implements PersonRepository {}
