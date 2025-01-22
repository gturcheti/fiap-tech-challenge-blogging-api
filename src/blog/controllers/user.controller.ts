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
import { UserService } from '../services/user.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { personSchema } from './person.controller';
import { IUser } from '../entities/models/user.interface';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { hash } from 'bcryptjs';

const userSchema = z.object({
  id: z.coerce.number().optional(),
  username: z.string(),
  password: z.string(),
  person: personSchema.optional(),
});

type UserSchema = z.infer<typeof userSchema>;

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.getUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllUser(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.userService.getAllUser(limit, page);
  }

  @ApiBearerAuth()
  @UsePipes(new ZodValidationPipe(userSchema))
  @Post()
  async createUser(@Body() { username, password, person }: UserSchema) {
    const saltRounds = 8;
    const hashedPassword = await hash(password, saltRounds);

    return await this.userService.createUser({
      username,
      password: hashedPassword,
      person,
    } as IUser);
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateUser(
    @Body(new ZodValidationPipe(userSchema))
    { id, username, password, person }: UserSchema,
  ) {
    const saltRounds = 8;
    const hashedPassword = await hash(password, saltRounds);

    return await this.userService.updateUser({
      id,
      username,
      password: hashedPassword,
      person,
    } as IUser);
  }

  @UseGuards(AuthGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
