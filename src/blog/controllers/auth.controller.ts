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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiOperation({
    summary: 'Autenticação de usuário',
    description: 'Realiza o login do usuário com o nome de usuário e senha.',
  })
  @ApiBody({
    description: 'Credenciais de login do usuário',
    examples: {
      example: {
        value: {
          username: 'johndoe',
          password:
            '$2b$12$ws1vZc5WiRdEBywb48lWGe7JwHjyqWrEevG3dZSRd.rzRABqnkdNq',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Autenticação bem-sucedida. Retorna o token de acesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas fornecidas.',
  })
  async signIn(@Body() signIn: Record<string, any>) {
    return await this.authService.signIn(signIn.username, signIn.password);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Obter perfil do usuário',
    description:
      'Retorna o perfil do usuário autenticado com base no token JWT.',
  })
  @ApiBearerAuth() // Informa que o endpoint requer um token JWT
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário retornado com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido ou ausente.',
  })
  async getProfile(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('Token inválido ou ausente');
    }
    return req.user;
  }
}
