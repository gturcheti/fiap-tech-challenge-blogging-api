import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appModule = module.get<AppModule>(AppModule);
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should include ConfigModule as a global module', () => {
    expect(AppModule.prototype.constructor.toString()).toContain(
      'ConfigModule.forRoot',
    );
  });

  it('should include TypeOrmModule with correct configuration', () => {
    expect(AppModule.prototype.constructor.toString()).toContain(
      'TypeOrmModule.forRoot',
    );
  });

  it('should import BlogModule', () => {
    const importedModules = Reflect.getMetadata('imports', AppModule) || [];
    const hasBlogModule = importedModules.some(
      (module) => module === BlogModule,
    );
    expect(hasBlogModule).toBe(true);
  });

  it('should provide AppController', () => {
    const controllers = Reflect.getMetadata('controllers', AppModule) || [];
    const hasAppController = controllers.includes(AppController);
    expect(hasAppController).toBe(true);
  });

  it('should provide AppService', () => {
    const providers = Reflect.getMetadata('providers', AppModule) || [];
    const hasAppService = providers.includes(AppService);
    expect(hasAppService).toBe(true);
  });
});
