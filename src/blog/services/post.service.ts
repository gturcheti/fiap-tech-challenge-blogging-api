import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { IPost } from '../entities/models/post.interface';

@Injectable()
export class PostService {
  constructor(readonly postRepository: PostRepository) {}

  async getPost(id: number) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundException(`Post not found`);
    return post;
  }

  async getAllPost(limit: number, page: number) {
    return await this.postRepository.findAll(limit, page);
  }

  async createPost(post: IPost) {
    return await this.postRepository.createEntity(post);
  }

  async updatePost(post: IPost) {
    return await this.postRepository.updateEntity(post);
  }

  async deletePost(post: IPost) {
    return this.postRepository.deleteEntity(post);
  }
}
