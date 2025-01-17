import { Person } from 'src/blog/entities/person.entity';
import { PersonRepository } from '../person.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPerson } from 'src/blog/entities/models/person.interface';

export class PersonPGRepository implements PersonRepository {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findById(id: number): Promise<IPerson | undefined> {
    return await this.personRepository.findOneBy({ id } as any);
  }

  async findAll(limit: number, page: number): Promise<IPerson[]> {
    return await this.personRepository.find({
      take: limit,
      skip: limit * (page - 1),
    });
  }

  async createPerson(person: IPerson): Promise<IPerson> {
    return await this.personRepository.save(person);
  }

  async updatePerson(
    existingPerson: IPerson,
    person: IPerson,
  ): Promise<IPerson> {
    const updatedPerson = this.personRepository.merge(existingPerson, person);
    return await this.personRepository.save(updatedPerson);
  }

  async deletePerson(person: IPerson): Promise<void> {
    await this.personRepository.remove(person);
  }
}
