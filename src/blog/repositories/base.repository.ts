export abstract class BaseRepository<T> {
  abstract findById(entityId: number): Promise<T>;
  abstract findAll(limit: number, page: number): Promise<T[]>;
  abstract createEntity(entity: T): Promise<T>;
  abstract updateEntity(entity: T): Promise<T>;
  abstract deleteEntity(entity: T): Promise<void>;
}
