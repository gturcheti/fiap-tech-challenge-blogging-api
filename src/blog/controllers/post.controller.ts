import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../entities/models/post.interface';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const postSchema = z.object({
  id: z.coerce.number().optional(),
  author: z.coerce.number(),
  title: z.string(),
  content: z.string(),
});

type PostSchema = z.infer<typeof postSchema>;

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':postId')
  async getPost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.getPost(postId);
  }

  @Get()
  async getAllPost(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.postService.getAllPost(limit, page);
  }

  @ApiBearerAuth()
  @UsePipes(new ZodValidationPipe(postSchema))
  @Post()
  async createPost(@Body() { author, title, content }: PostSchema) {
    const post: IPost = { author, title, content };
    return await this.postService.createPost(post);
  }

  @Put()
  async updatePost(
    @Body(new ZodValidationPipe(postSchema))
    { id, author, title, content }: PostSchema,
  ) {
    return await this.postService.updatePost({ id, author, title, content });
  }

  @Delete(':postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.deletePost(postId);
  }
}
