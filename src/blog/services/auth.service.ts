import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { PersonService } from './person.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private personService: PersonService,
    private jwtService: JwtService,
  ) {}

  //TODO inteface for signIn
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (user?.password === password) {
      const person = await this.personService.getPerson(user.person.id);
      if (!person) throw new NotFoundException('Person not found');

      const payload = {
        username: user.username,
        sub: user.id,
        admin: person?.professor || false,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
