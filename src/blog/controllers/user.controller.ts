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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const userSchema = z.object({
  id: z.coerce.number().optional(),
  username: z.string(),
  password: z.string(),
  person: z.coerce.number().optional(),
});

type UserSchema = z.infer<typeof userSchema>;

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.userService.getUser(userId);
  }

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
    return await this.userService.createUser({ username, password, person });
  }

  @Put()
  async updateUser(
    @Body(new ZodValidationPipe(userSchema))
    { id, username, password, person }: UserSchema,
  ) {
    return await this.userService.updateUser({
      id,
      username,
      password,
      person,
    });
  }

  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
