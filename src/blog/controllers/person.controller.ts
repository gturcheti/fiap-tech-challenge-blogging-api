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
import { PersonService } from '../services/person.service';
import { IPerson } from '../entities/models/person.interface';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(':personId')
  async getPerson(@Param('personId') personId: number) {
    return await this.personService.getPerson(personId);
  }

  @Get()
  async getAllPerson(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return await this.personService.getAllPerson(limit, page);
  }

  @Post()
  async createPerson(@Body() person: IPerson) {
    return await this.personService.createPerson(person);
  }

  @Put(':personId')
  async updatePerson(
    @Param('personId') personId: string,
    @Body() person: IPerson,
  ) {
    return await this.personService.updatePerson(parseInt(personId), person);
  }

  @Delete(':personId')
  async deletePerson(@Param('personId') personId: number) {
    return this.personService.deletePerson(personId);
  }
}
