import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { bootstrap } from './main';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

jest.mock('./shared/filters/http-exception.filter', () => ({
  HttpExceptionFilter: jest.fn(),
}));

describe('Main bootstrap function', () => {
  let listenSpy: jest.Mock;
  let useGlobalFiltersSpy: jest.Mock;

  beforeEach(() => {
    listenSpy = jest.fn();
    useGlobalFiltersSpy = jest.fn();

    (NestFactory.create as jest.Mock).mockResolvedValue({
      useGlobalFilters: useGlobalFiltersSpy,
      listen: listenSpy,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.PORT;
  });

  it('should bootstrap the application and call all necessary methods', async () => {
    process.env.PORT = '4000'; // Simular uma porta configurada
    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(useGlobalFiltersSpy).toHaveBeenCalledWith(expect.any(HttpExceptionFilter));
    expect(listenSpy).toHaveBeenCalledWith(4000);
  });

  it('should use the default port 3000 when process.env.PORT is not defined', async () => {
    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(useGlobalFiltersSpy).toHaveBeenCalledWith(expect.any(HttpExceptionFilter));
    expect(listenSpy).toHaveBeenCalledWith(3000);
  });
});
