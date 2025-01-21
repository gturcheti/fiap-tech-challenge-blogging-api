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
import { PersonService } from '../services/person.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';

export const personSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  professor: z.boolean(),
});

type PersonSchema = z.infer<typeof personSchema>;

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @UseGuards(AuthGuard)
  @Get(':personId')
  async getPerson(@Param('personId', ParseIntPipe) personId: number) {
    return await this.personService.getPerson(personId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllPerson(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.personService.getAllPerson(limit, page);
  }

  @ApiBearerAuth()
  @UsePipes(new ZodValidationPipe(personSchema))
  @Post()
  async createPerson(
    @Body() { name, surname, email, professor }: PersonSchema,
  ) {
    return await this.personService.createPerson({
      name,
      surname,
      email,
      professor,
    });
  }

  @UseGuards(AuthGuard)
  @Put()
  async updatePerson(
    @Body(new ZodValidationPipe(personSchema))
    { id, name, surname, email, professor }: PersonSchema,
  ) {
    return await this.personService.updatePerson({
      id,
      name,
      surname,
      email,
      professor,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':personId')
  async deletePerson(@Param('personId', ParseIntPipe) personId: number) {
    return this.personService.deletePerson(personId);
  }
}
