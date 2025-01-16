import { Repository, EntityTarget, EntityManager } from 'typeorm';
import { BaseRepository } from '../base.repository';

export class BasePGRepository<T>
  extends Repository<T>
  implements BaseRepository<T>
{
  constructor(entity: EntityTarget<T>, manager: EntityManager) {
    super(entity, manager);
  }

  async findById(id: number): Promise<T | undefined> {
    return this.findOneBy({ id } as any);
  }

  async findAll(limit: number, page: number): Promise<T[]> {
    return this.find({
      take: limit,
      skip: limit * (page - 1),
    });
  }

  async createEntity(entity: T): Promise<T> {
    return this.save(entity);
  }

  async updateEntity(entity: T): Promise<T> {
    return this.save(entity);
  }

  async deleteEntity(entity: T): Promise<void> {
    await this.remove(entity);
  }
}
