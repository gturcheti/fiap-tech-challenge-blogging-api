import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRepository } from '../repositories/person.repository';
import { IPerson } from '../entities/models/person.interface';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  async getPerson(id: number) {
    const person = await this.personRepository.findById(id);
    if (!person) throw new NotFoundException(`Person not found`);
    return person;
  }

  async getAllPerson(limit: number, page: number) {
    return await this.personRepository.findAll(limit, page);
  }

  async createPerson(person: IPerson) {
    return await this.personRepository.createPerson(person);
  }

  async updatePerson(person: IPerson) {
    return await this.personRepository.updatePerson(person);
  }

  async deletePerson(personId) {
    const person = await this.personRepository.findById(personId);
    if (!person) throw new NotFoundException(`Person not found`);
    return await this.personRepository.deletePerson(person);
  }
}
