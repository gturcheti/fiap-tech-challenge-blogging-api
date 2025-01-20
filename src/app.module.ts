import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
