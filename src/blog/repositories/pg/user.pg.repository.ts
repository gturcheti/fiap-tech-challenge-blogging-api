import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from 'src/blog/entities/models/user.interface';
import { User } from 'src/blog/entities/user.entity';
import { UserRepository } from '../user.repository';

export class UserPGRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<IUser | undefined> {
    return await this.userRepository.findOne({
      where: { id } as any,
      relations: ['person'],
    });
  }

  async findAll(limit: number, page: number): Promise<IUser[]> {
    return await this.userRepository.find({
      take: limit,
      skip: limit * (page - 1),
      relations: ['person'],
    });
  }

  async createUser(user: IUser): Promise<IUser> {
    return await this.userRepository.save(user);
  }

  async updateUser(user: IUser): Promise<IUser> {
    return await this.userRepository.save(user);
  }

  async deleteUser(user: IUser): Promise<void> {
    await this.userRepository.remove(user);
  }
}
