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
  controllers: [UserController],
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
  ],
})
export class BlogModule {}
