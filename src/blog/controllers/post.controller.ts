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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../entities/models/post.interface';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { personSchema } from './person.controller';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AdminGuard } from 'src/shared/guards/admin.guard';

const postSchema = z.object({
  id: z.coerce.number().optional(),
  author: personSchema.optional(),
  title: z.string(),
  content: z.string(),
});

type PostSchema = z.infer<typeof postSchema>;

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Get(':postId')
  async getPost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.getPost(postId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllPost(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.postService.getAllPost(limit, page);
  }

  @UseGuards(AuthGuard)
  @Get('search')
  async getAllPostByKey(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('key') key?: string,
  ) {
    return await this.postService.getAllPostByKey(limit, page, key);
  }

  @ApiBearerAuth()
  @UsePipes(new ZodValidationPipe(postSchema))
  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  async createPost(@Body() { author, title, content }: PostSchema) {
    return await this.postService.createPost({
      author,
      title,
      content,
    } as IPost);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put()
  async updatePost(
    @Body(new ZodValidationPipe(postSchema))
    { id, author, title, content }: PostSchema,
  ) {
    return await this.postService.updatePost({
      id,
      author,
      title,
      content,
    } as IPost);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':postId')
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.deletePost(postId);
  }
}
