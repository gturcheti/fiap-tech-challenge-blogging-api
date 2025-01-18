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
    return await this.personRepository.findOneBy({ id });
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

  async updatePerson(person: IPerson): Promise<IPerson> {
    return await this.personRepository.save(person);
  }

  async deletePerson(person: IPerson): Promise<void> {
    await this.personRepository.remove(person);
  }
}
