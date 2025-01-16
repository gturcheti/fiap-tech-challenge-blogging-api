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
  ],
})
export class BlogModule {}
