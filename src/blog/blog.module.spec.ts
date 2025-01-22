import { Test, TestingModule } from '@nestjs/testing';
import { BlogModule } from './blog.module';
import { UserController } from './controllers/user.controller';
import { PersonController } from './controllers/person.controller';
import { PostController } from './controllers/post.controller';
import { UserService } from './services/user.service';
import { PersonService } from './services/person.service';
import { PostService } from './services/post.service';
import { UserRepository } from './repositories/user.repository';
import { PostRepository } from './repositories/post.repository';
import { PersonRepository } from './repositories/person.repository';
import { UserPGRepository } from './repositories/pg/user.pg.repository';
import { PostPGRepository } from './repositories/pg/post.pg.repository';
import { PersonPGRepository } from './repositories/pg/person.pg.repository';

describe('BlogModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [BlogModule],  // Importa o BlogModule
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Controllers', () => {
    it('should instantiate UserController', () => {
      const userController = app.get<UserController>(UserController);
      expect(userController).toBeDefined();
    });

    it('should instantiate PersonController', () => {
      const personController = app.get<PersonController>(PersonController);
      expect(personController).toBeDefined();
    });

    it('should instantiate PostController', () => {
      const postController = app.get<PostController>(PostController);
      expect(postController).toBeDefined();
    });
  });

  describe('Services', () => {
    it('should instantiate UserService', () => {
      const userService = app.get<UserService>(UserService);
      expect(userService).toBeDefined();
    });

    it('should instantiate PersonService', () => {
      const personService = app.get<PersonService>(PersonService);
      expect(personService).toBeDefined();
    });

    it('should instantiate PostService', () => {
      const postService = app.get<PostService>(PostService);
      expect(postService).toBeDefined();
    });
  });

  describe('Repositories', () => {
    it('should instantiate UserRepository', () => {
      const userRepository = app.get<UserRepository>(UserRepository);
      expect(userRepository).toBeDefined();
    });

    it('should instantiate PostRepository', () => {
      const postRepository = app.get<PostRepository>(PostRepository);
      expect(postRepository).toBeDefined();
    });

    it('should instantiate PersonRepository', () => {
      const personRepository = app.get<PersonRepository>(PersonRepository);
      expect(personRepository).toBeDefined();
    });
  });

  describe('PG Repositories', () => {
    it('should instantiate UserPGRepository', () => {
      const userPGRepository = app.get<UserPGRepository>(UserPGRepository);
      expect(userPGRepository).toBeDefined();
    });

    it('should instantiate PostPGRepository', () => {
      const postPGRepository = app.get<PostPGRepository>(PostPGRepository);
      expect(postPGRepository).toBeDefined();
    });

    it('should instantiate PersonPGRepository', () => {
      const personPGRepository = app.get<PersonPGRepository>(PersonPGRepository);
      expect(personPGRepository).toBeDefined();
    });
  });
describe('BlogModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [BlogModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});

});
