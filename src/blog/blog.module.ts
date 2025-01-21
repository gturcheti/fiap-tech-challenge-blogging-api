import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { Person } from './entities/person.entity';
import { PersonRepository } from './repositories/person.repository';
import { PersonPGRepository } from './repositories/pg/person.pg.repository';
import { PersonService } from './services/person.service';
import { PersonController } from './controllers/person.controller';
import { Post } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';
import { PostPGRepository } from './repositories/pg/post.pg.repository';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserPGRepository } from './repositories/pg/user.pg.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
      Post,
      PostRepository,
      Person,
      PersonRepository,
    ]),
  ],
  controllers: [
    AuthController,
    PersonController,
    PostController,
    UserController,
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPGRepository,
    },
    {
      provide: PostRepository,
      useClass: PostPGRepository,
    },
    {
      provide: PersonRepository,
      useClass: PersonPGRepository,
    },
    AuthService,
    UserService,
    PersonService,
    PostService,
  ],
})
export class BlogModule {}
