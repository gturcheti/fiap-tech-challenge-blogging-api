// Arquivo: tests/post.test.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/post/:postId (GET)', () => {
    it('Deve retornar os dados de um post pelo ID', async () => {
      const postId = 1; // Supondo que o ID 1 exista
      const response = await request(app.getHttpServer()).get(`/post/${postId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', postId);
      expect(response.body).toHaveProperty('author');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('content');
    });

    it('Deve retornar status 404 se o post não for encontrado', async () => {
      const response = await request(app.getHttpServer()).get('/post/99999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Post não encontrado');
    });
  });

  describe('/post (GET)', () => {
    it('Deve retornar uma lista paginada de posts', async () => {
      const response = await request(app.getHttpServer()).get('/post?limit=10&page=1');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((post: any) => {
        expect(post).toHaveProperty('id');
        expect(post).toHaveProperty('author');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('content');
      });
    });

    it('Deve retornar status 400 para parâmetros inválidos', async () => {
      const response = await request(app.getHttpServer()).get('/post?limit=invalid&page=1');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('/post (POST)', () => {
    it('Deve criar um novo post e retornar os dados criados', async () => {
      const newPost = {
        author: 1,
        title: 'Novo Post',
        content: 'Conteúdo do novo post.',
      };

      const response = await request(app.getHttpServer()).post('/post').send(newPost);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.author).toBe(newPost.author);
      expect(response.body.title).toBe(newPost.title);
      expect(response.body.content).toBe(newPost.content);
    });

    it('Deve retornar status 400 se os dados forem inválidos', async () => {
      const invalidPost = {
        author: 1,
        title: '',
        content: 'Conteúdo sem título.',
      };

      const response = await request(app.getHttpServer()).post('/post').send(invalidPost);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('/post (PUT)', () => {
    it('Deve atualizar os dados de um post existente', async () => {
      const updatedPost = {
        id: 1,
        author: 1,
        title: 'Post Atualizado',
        content: 'Conteúdo do post atualizado.',
      };

      const response = await request(app.getHttpServer()).put('/post').send(updatedPost);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updatedPost.title);
      expect(response.body.content).toBe(updatedPost.content);
    });

    it('Deve retornar status 400 para dados inválidos', async () => {
      const invalidUpdate = {
        id: 1,
        title: '',
      };

      const response = await request(app.getHttpServer()).put('/post').send(invalidUpdate);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('/post/:postId (DELETE)', () => {
    it('Deve excluir um post pelo ID e retornar status 204', async () => {
      const postId = 1; // Supondo que o ID 1 exista
      const response = await request(app.getHttpServer()).delete(`/post/${postId}`);

      expect(response.status).toBe(204);
    });

    it('Deve retornar status 404 se o post não for encontrado', async () => {
      const response = await request(app.getHttpServer()).delete('/post/99999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Post não encontrado');
    });
  });
});