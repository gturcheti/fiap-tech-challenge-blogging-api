import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { exctractTokenFromHeader } from '../utils/extract-token-from-header';
import { UserService } from 'src/blog/services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = exctractTokenFromHeader(request);

    if (!token) {
      throw new ForbiddenException();
    }

    const decoded = this.jwtService.decode(token);
    if (decoded && decoded['sub']) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { person, ...rest } = await this.userService.getUser(
        decoded['sub'],
      );
      return person.professor;
    }

    throw new ForbiddenException();
  }
}
