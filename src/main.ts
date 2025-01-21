import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = 
  new DocumentBuilder()
  .setTitle('Tech Challenge Blog API - DOC')
  .setDescription('This API powers the Tech Challenge Blog application, allowing users to manage posts, profiles, and authentication. It supports CRUD operations for blog content and user management, with PostgreSQL as the data store. Secure token-based authentication and full API documentation Swagger are provided for seamless integration.')
  .setVersion('1.0')
  .addTag('Person')
  .addTag('Post')
  .addTag('User')
  .addBasicAuth()
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('doc', app, document)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
