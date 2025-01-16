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
import { UserService } from '../services/user.service';
import { IUser } from '../entities/models/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: number) {
    return await this.userService.getUser(userId);
  }

  @Get()
  async getAllUser(@Query('limit') limit: number, @Query('page') page: number) {
    return await this.userService.getAllUser(limit, page);
  }

  @Post()
  async createUser(@Body() user: IUser) {
    return await this.userService.createUser(user);
  }

  @Put(':userId')
  async updateUser(@Body() user: IUser) {
    return await this.userService.updateUser(user);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number) {
    const user = await this.userService.getUser(userId);
    return this.userService.deleteUser(user);
  }
}
