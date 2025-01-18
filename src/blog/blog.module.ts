import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserPGRepository } from './repositories/pg/user.pg.repository';
import { UserService } from './services/user.service';
import { PostRepository } from './repositories/post.repository';
import { Post } from './entities/post.entity';
import { Person } from './entities/person.entity';
import { PersonRepository } from './repositories/person.repository';
import { PostPGRepository } from './repositories/pg/post.pg.repository';
import { PersonPGRepository } from './repositories/pg/person.pg.repository';
import { PersonController } from './controllers/person.controller';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { PersonService } from './services/person.service';

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
  controllers: [PersonController, PostController, UserController],
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
    UserService,
    PersonService,
    PostService,
  ],
})
export class BlogModule {}
