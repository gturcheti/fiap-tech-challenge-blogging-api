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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  constructor(private readonly postService: PostService) { }

  @UseGuards(AuthGuard)
  @Get(':postId')
  @ApiOperation({
    summary: 'Buscar um post pelo seu ID',
    description: 'Esse endpoint retorna um post específico através do ID fornecido.',
  })
  @ApiParam({
    name: 'postId',
    type: Number,
    description: 'ID do post a ser retornado',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Post retornado com sucesso.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        author: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Título do Post' },
        content: { type: 'string', example: 'Conteúdo do post aqui.' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Post não encontrado.' })
  async getPost(@Param('postId', ParseIntPipe) postId: number) {
    return await this.postService.getPost(postId);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Buscar uma lista de posts com paginação',
    description: 'Esse endpoint retorna uma lista de posts paginados.',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: true,
    description: 'Número máximo de posts por página',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: true,
    description: 'Número da página a ser retornada',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de posts retornada com sucesso.',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number', example: 100 },
        limit: { type: 'number', example: 10 },
        page: { type: 'number', example: 1 },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              author: { type: 'number', example: 1 },
              title: { type: 'string', example: 'Título do Post' },
              content: { type: 'string', example: 'Conteúdo do post aqui.' },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Parâmetros de consulta inválidos.' })
  async getAllPost(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.postService.getAllPost(limit, page);
  }

  @ApiBearerAuth()
  @UsePipes(new ZodValidationPipe(postSchema))
  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  @ApiOperation({
    summary: 'Criar um novo post',
    description: 'Esse endpoint cria um novo post com os dados fornecidos.',
  })
  @ApiResponse({ status: 201, description: 'Post criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        author: { type: 'number', description: 'ID do autor', example: 1 },
        title: { type: 'string', description: 'Título do post', example: 'Título do Post' },
        content: { type: 'string', description: 'Conteúdo do post', example: 'Conteúdo do post aqui.' },
      },
      required: ['author', 'title', 'content'],
    },
  })
  async createPost(@Body() { author, title, content }: PostSchema) {
    return await this.postService.createPost({
      author,
      title,
      content,
    } as IPost);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put()
  @ApiOperation({
    summary: 'Atualizar um post existente',
    description: 'Esse endpoint permite atualizar um post existente, fornecendo o ID e os novos dados.',
  })
  @ApiResponse({ status: 200, description: 'Post atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  @ApiResponse({ status: 404, description: 'Post não encontrado.' })
  @ApiBody({
    description: 'Dados necessários para atualizar um post existente. Inclua o ID do post.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'ID do post a ser atualizado', example: 1 },
        author: { type: 'number', description: 'ID do autor', example: 1 },
        title: { type: 'string', description: 'Título do post', example: 'Título Atualizado' },
        content: { type: 'string', description: 'Conteúdo do post', example: 'Conteúdo atualizado.' },
      },
      required: ['id', 'author', 'title', 'content'],
    },
  })
  async updatePost(
    @Body(new ZodValidationPipe(postSchema)) { id, author, title, content }: PostSchema,
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
  @ApiOperation({
    summary: 'Deletar um post pelo seu ID',
    description: 'Remove um post específico usando o ID fornecido.',
  })
  @ApiParam({
    name: 'postId',
    type: Number,
    description: 'ID do post a ser excluído.',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Post excluído com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Post não encontrado. O ID fornecido não corresponde a nenhum post existente.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido fornecido. O ID deve ser um número válido.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor. Ocorreu um problema ao tentar excluir o post.',
  })
  async deletePost(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.deletePost(postId);
  }

}
