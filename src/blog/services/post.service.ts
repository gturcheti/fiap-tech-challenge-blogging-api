import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { IPost } from '../entities/models/post.interface';
import { PersonRepository } from '../repositories/person.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly personRepository: PersonRepository,
  ) {}

  async getPost(id: number) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundException(`Post not found`);
    return post;
  }

  async getAllPost(limit: number, page: number) {
    return await this.postRepository.findAll(limit, page);
  }

  async getAllPostByKey(limit: number, page: number, key?: string) {
    if (!key) throw new BadRequestException();
    return await this.postRepository.findAllByKey(limit, page, key);
  }

  async createPost(post: IPost) {
    if (post.author) {
      const person = await this.personRepository.findById(post.author.id);
      if (!person) throw new NotFoundException(`Author not found`);
    }
    return await this.postRepository.createPost(post);
  }

  async updatePost(post: IPost) {
    if (post.author) {
      const person = await this.personRepository.findById(post.author.id);
      if (!person) throw new NotFoundException(`Author not found`);
    }
    return await this.postRepository.updatePost(post);
  }

  async deletePost(postId: number) {
    const post = await this.postRepository.findById(postId);
    if (!post) throw new NotFoundException(`Post not found`);
    return this.postRepository.deletePost(post);
  }
}
