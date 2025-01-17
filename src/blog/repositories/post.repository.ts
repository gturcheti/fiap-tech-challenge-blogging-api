import { IPost } from '../entities/models/post.interface';

export abstract class PostRepository {
  abstract findById(postId: number): Promise<IPost>;
  abstract findAll(limit: number, page: number): Promise<IPost[]>;
  abstract createPost(post: IPost): Promise<IPost>;
  abstract updatePost(existingPost: IPost, post: IPost): Promise<IPost>;
  abstract deletePost(post: IPost): Promise<void>;
}
