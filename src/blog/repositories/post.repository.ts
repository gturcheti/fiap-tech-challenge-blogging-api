import { IPost } from '../entities/models/post.interface';

export abstract class PostRepository {
  abstract findAll(limit: number, page: number): Promise<IPost[]>;
  abstract findAllByKey(
    limit: number,
    page: number,
    key?: string,
  ): Promise<IPost[]>;
  abstract findById(postId: number): Promise<IPost>;
  abstract createPost(post: IPost): Promise<IPost>;
  abstract updatePost(post: IPost): Promise<IPost>;
  abstract deletePost(post: IPost): Promise<void>;
}
