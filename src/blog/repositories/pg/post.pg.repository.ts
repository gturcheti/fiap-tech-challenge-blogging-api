import { Repository } from 'typeorm';
import { Post } from 'src/blog/entities/post.entity';
import { PostRepository } from '../post.repository';
import { IPost } from 'src/blog/entities/models/post.interface';
import { InjectRepository } from '@nestjs/typeorm';

export class PostPGRepository implements PostRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findById(id: number): Promise<IPost | undefined> {
    return await this.postRepository.findOne({
      where: { id } as any,
      relations: ['author'],
    });
  }

  async findAll(limit: number, page: number): Promise<IPost[]> {
    return await this.postRepository.find({
      take: limit,
      skip: limit * (page - 1),
      relations: ['author'],
    });
  }

  async createPost(post: IPost): Promise<IPost> {
    return await this.postRepository.save(post);
  }

  async updatePost(post: IPost): Promise<IPost> {
    return await this.postRepository.save(post);
  }

  async deletePost(post: IPost): Promise<void> {
    await this.postRepository.remove(post);
  }

  async findAllByKey(
    limit: number,
    page: number,
    key: string,
  ): Promise<IPost[]> {
    return await this.postRepository.find({
      take: limit,
      skip: limit * (page - 1),
      where: [{ title: key }, { content: key }],
    });
  }
}
