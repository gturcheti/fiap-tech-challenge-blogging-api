import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PersonService } from '../services/person.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


export const personSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  professor: z.boolean(),
});

type PersonSchema = z.infer<typeof personSchema>;

@ApiTags('Person')
@Controller('Person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @UseGuards(AuthGuard)
  @Get(':personId')
  @ApiOperation({ summary: 'Retornar uma pessoa pelo ID' })
  @ApiParam({
    name: 'personId',
    type: Number,
    description: 'ID da pessoa a ser retornada',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Pessoa retornada com sucesso.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'João' },
        surname: { type: 'string', example: 'Silva' },
        email: { type: 'string', example: 'joao.silva@email.com' },
        professor: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada.' })
  @ApiResponse({ status: 400, description: 'Parâmetro fornecido é inválido' })
  async getPerson(@Param('personId', ParseIntPipe) personId: number) {
    const person = await this.personService.getPerson(personId);
    if (!person) {
      throw new NotFoundException(`Pessoa com ID ${personId} não encontrada.`);
    }
    return person;
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retornar uma lista paginada de pessoas' })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: true,
    description: 'Número máximo de pessoas a serem retornadas por página',
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
    description: 'Lista de pessoas retornada com sucesso.',
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
              name: { type: 'string', example: 'João' },
              surname: { type: 'string', example: 'Silva' },
              email: { type: 'string', example: 'joao.silva@email.com' },
              professor: { type: 'boolean', example: true },
            },
          },
          example: [
            {
              id: 1,
              name: 'João',
              surname: 'Silva',
              email: 'joao.silva@email.com',
              professor: true,
            },
            {
              id: 2,
              name: 'Maria',
              surname: 'Oliveira',
              email: 'maria.oliveira@email.com',
              professor: false,
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos fornecidos.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor.',
  })
  async getAllPerson(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return this.personService.getAllPerson(limit, page);
  }

  @ApiBearerAuth()
  @UsePipes(new ZodValidationPipe(personSchema))
  @Post()
  @ApiOperation({ summary: 'Criar uma nova pessoa' })
  @ApiResponse({ status: 201, description: 'Pessoa criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Nome da pessoa', example: 'João' },
        surname: { type: 'string', description: 'Sobrenome da pessoa', example: 'Silva' },
        email: { type: 'string', description: 'E-mail válido da pessoa', example: 'joao.silva@email.com' },
        professor: { type: 'boolean', description: 'Indica se a pessoa é um professor', example: true },
      },
      required: ['name', 'surname', 'email', 'professor'],
    },
  })
  async createPerson(@Body() { name, surname, email, professor }: PersonSchema) {
    return this.personService.createPerson({ name, surname, email, professor });
  }

  @UseGuards(AuthGuard)
  @Put()
  @ApiOperation({ summary: 'Atualizar uma pessoa existente' })
  @ApiResponse({ status: 200, description: 'Pessoa atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({ status: 404, description: 'Pessoa não encontrada.' })
  @ApiBody({
    description: 'Dados necessários para atualizar uma pessoa existente. Todos os campos devem ser fornecidos, incluindo o ID.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'ID único da pessoa a ser atualizada', example: 1 },
        name: { type: 'string', description: 'Nome da pessoa', example: 'Lucas' },
        surname: { type: 'string', description: 'Sobrenome da pessoa', example: 'Silva' },
        email: { type: 'string', description: 'E-mail válido da pessoa', example: 'lucas.silva@email.com' },
        professor: { type: 'boolean', description: 'Indica se a pessoa é professor', example: true },
      },
      required: ['id', 'name', 'surname', 'email', 'professor'],
    },
  })
  async updatePerson(@Body() { id, name, surname, email, professor }: PersonSchema) {
    return this.personService.updatePerson({ id, name, surname, email, professor });
  }

  @UseGuards(AuthGuard)
  @Delete(':personId')
  @ApiOperation({ summary: 'Deletar uma pessoa pelo ID' })
  @ApiParam({
    name: 'personId',
    type: Number,
    description: 'ID da pessoa a ser deletada',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Pessoa deletada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Pessoa não encontrada.',
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetro inválido fornecido.',
  })
  async deletePerson(@Param('personId', ParseIntPipe) personId: number) {
    const person = await this.personService.getPerson(personId);
    if (!person) {
      throw new NotFoundException(`Pessoa com ID ${personId} não encontrada.`);
    }

    await this.personService.deletePerson(personId);
    return { message: `Pessoa com ID ${personId} deletada com sucesso.` };
  }
}