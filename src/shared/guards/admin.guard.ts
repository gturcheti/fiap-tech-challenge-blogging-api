import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { exctractTokenFromHeader } from '../utils/extract-token-from-header';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = exctractTokenFromHeader(request);

    if (!token) {
      throw new ForbiddenException();
    }

    const decoded = this.jwtService.decode(token);
    if (decoded && decoded['admin']) {
      return true;
    }

    throw new ForbiddenException();
  }
}
