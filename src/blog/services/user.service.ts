import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../entities/models/user.interface';

@Injectable()
export class UserService {
  constructor(readonly userRepository: UserRepository) {}

  async getUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async getAllUser(limit: number, page: number) {
    return await this.userRepository.findAll(limit, page);
  }

  async createUser(user: IUser) {
    return await this.userRepository.createEntity(user);
  }

  async updateUser(user: IUser) {
    return await this.userRepository.updateEntity(user);
  }

  async deleteUser(user: IUser) {
    return this.userRepository.deleteEntity(user);
  }
}
