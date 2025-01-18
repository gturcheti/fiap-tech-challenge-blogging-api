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
import { PersonService } from '../services/person.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';

const personSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  professor: z.boolean(),
});

type PersonSchema = z.infer<typeof personSchema>;

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(':personId')
  async getPerson(@Param('personId', ParseIntPipe) personId: number) {
    return await this.personService.getPerson(personId);
  }

  @Get()
  async getAllPerson(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.personService.getAllPerson(limit, page);
  }

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

  @Delete(':personId')
  async deletePerson(@Param('personId', ParseIntPipe) personId: number) {
    return this.personService.deletePerson(personId);
  }
}
