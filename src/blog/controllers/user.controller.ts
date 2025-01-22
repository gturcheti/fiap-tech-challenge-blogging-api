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
import { UserService } from '../services/user.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiResponse, ApiProperty } from '@nestjs/swagger';


const userSchema = z.object({
  id: z.coerce.number().optional(),
  username: z.string(),
  password: z.string(),
  person: z.coerce.number().optional(),
});

type UserSchema = z.infer<typeof userSchema>;

class UserResponseDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'johndoe',
  })
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'password123',
  })
  password: string;

  @ApiProperty({
    description: 'ID da pessoa associada ao usuário',
    example: 42,
    required: false,
  })
  person?: number;
}

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':userId')
  @ApiOperation({
    summary: 'Obter usuário pelo ID',
    description: 'Retorna os detalhes de um usuário específico usando seu ID.',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID do usuário.',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado e retornado com sucesso.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        username: { type: 'string', example: 'joao' },
        person: { type: 'number', example: 42 },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado com o ID fornecido.',
  })
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.getUser(userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter todos os usuários',
    description: 'Retorna uma lista de usuários com paginação opcional.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          username: { type: 'string', example: 'joao' },
          person: { type: 'number', example: 42 },
        },
      },
      example: [
        {
          id: 1,
          username: 'joao',
          person: 42,
        },
        {
          id: 2,
          username: 'lucas',
          person: 43,
        },
        {
          id: 3,
          username: 'alex',
          person: 44,
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros de consulta inválidos.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor ao tentar recuperar a lista de usuários.',
  })
  async getAllUser(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.userService.getAllUser(limit, page);
  }


  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Criar um novo usuário',
    description: 'Cria um novo usuário com os dados fornecidos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos para criação do usuário.',
  })
  @UsePipes(new ZodValidationPipe(userSchema))
  async createUser(@Body() { username, password, person }: UserSchema) {
    return await this.userService.createUser({ username, password, person });
  }

  @Put()
  @ApiOperation({
    summary: 'Atualizar usuário existente',
    description: 'Atualiza as informações de um usuário existente com os dados fornecidos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos para atualização do usuário.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado com o ID fornecido.',
  })
  @UsePipes(new ZodValidationPipe(userSchema))
  async updateUser(
    @Body() { id, username, password, person }: UserSchema,
  ) {
    return await this.userService.updateUser({ id, username, password, person });
  }

  @Delete(':userId')
  @ApiOperation({
    summary: 'Deletar usuário pelo ID',
    description: 'Remove um usuário específico usando o ID fornecido.',
  })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'ID do usuário a ser deletado.',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário excluído com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado com o ID fornecido.',
  })
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
