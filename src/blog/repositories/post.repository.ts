import { IPost } from '../entities/models/post.interface';
import { BaseRepository } from './base.repository';

export abstract class PostRepository extends BaseRepository<IPost> {}
