import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonPGRepository } from './repositories/pg/person.pg.repository';
import { Person } from './entities/person.entity';
import { Post } from './entities/post.entity';
import { PostPGRepository } from './repositories/pg/post.pg.repository';
import { User } from './entities/users.entity';
import { UserPGRepository } from './repositories/pg/user.pg.repository';
import { PersonRepository } from './repositories/person.repository';
import { PostRepository } from './repositories/post.repository';
import { UserRepository } from './repositories/user.repository';
import { PersonService } from './services/person.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { PersonController } from './controllers/person.controller';
import { UserController } from './controllers/user.controller';
import { PostController } from './controllers/post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      PersonPGRepository,
      Post,
      PostPGRepository,
      User,
      UserPGRepository,
    ]),
  ],
  controllers: [PersonController, PostController, UserController],
  providers: [
    {
      provide: PersonRepository,
      useClass: PersonPGRepository,
    },
    {
      provide: PostRepository,
      useClass: PostPGRepository,
    },
    {
      provide: UserRepository,
      useClass: UserPGRepository,
    },
    PersonService,
    PostService,
    UserService,
  ],
})
export class BlogModule {}
