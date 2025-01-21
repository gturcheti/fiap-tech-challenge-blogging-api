import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() signIn: Record<string, any>) {
    return await this.authService.signIn(signIn.username, signIn.password);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getProfile(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('Token inválido ou ausente');
    }
    return req.user;
  }
}
