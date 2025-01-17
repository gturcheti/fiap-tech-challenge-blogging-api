import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../entities/models/post.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':postId')
  async getPost(@Param('postId') postId: number) {
    return await this.postService.getPost(postId);
  }

  @Get()
  async getAllPost(@Query('limit') limit: number, @Query('page') page: number) {
    return await this.postService.getAllPost(limit, page);
  }

  @Post()
  async createPost(@Body() post: IPost) {
    return await this.postService.createPost(post);
  }

  @Put(':postId')
  async updatePost(@Param('postId') postId: string, @Body() post: IPost) {
    return await this.postService.updatePost(parseInt(postId), post);
  }

  @Delete(':postId')
  async deletePost(@Param('postId') postId: number) {
    return this.postService.deletePost(postId);
  }
}
