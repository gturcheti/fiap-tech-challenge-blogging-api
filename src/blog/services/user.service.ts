import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '../entities/models/user.interface';
import { UserRepository } from '../repositories/user.repository';
import { PersonRepository } from '../repositories/person.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly personRepository: PersonRepository,
  ) {}

  async getUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async getAllUser(limit: number, page: number) {
    return await this.userRepository.findAll(limit, page);
  }

  async createUser(user: IUser) {
    if (user.person) {
      const person = await this.personRepository.findById(user.person.id);
      if (!person) throw new NotFoundException(`Person not found`);
    }
    return await this.userRepository.createUser(user);
  }

  async updateUser(user: IUser) {
    const person = await this.personRepository.findById(user.person.id);
    if (!person) throw new NotFoundException(`Person not found`);
    return await this.userRepository.updateUser(user);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException(`User not found`);
    return this.userRepository.deleteUser(user);
  }
}
