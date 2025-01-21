// Arquivo: tests/user.test.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
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

  describe('/user/:userId (GET)', () => {
    it('Deve retornar os dados de um usuário pelo ID', async () => {
      const userId = 1; // Supondo que o ID 1 exista
      const response = await request(app.getHttpServer()).get(`/user/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('person');
    });

    it('Deve retornar status 404 se o usuário não for encontrado', async () => {
      const response = await request(app.getHttpServer()).get('/user/99999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Usuário não encontrado');
    });
  });

  describe('/user (GET)', () => {
    it('Deve retornar uma lista paginada de usuários', async () => {
      const response = await request(app.getHttpServer()).get('/user?limit=10&page=1');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((user: any) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('person');
      });
    });

    it('Deve retornar status 400 para parâmetros inválidos', async () => {
      const response = await request(app.getHttpServer()).get('/user?limit=invalid&page=1');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('/user (POST)', () => {
    it('Deve criar um novo usuário e retornar os dados criados', async () => {
      const newUser = {
        username: 'novousuario',
        password: 'senha123',
        person: 1,
      };

      const response = await request(app.getHttpServer()).post('/user').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe(newUser.username);
      expect(response.body.person).toBe(newUser.person);
    });

    it('Deve retornar status 400 se os dados forem inválidos', async () => {
      const invalidUser = {
        username: '',
        password: 'senha123',
      };

      const response = await request(app.getHttpServer()).post('/user').send(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('/user (PUT)', () => {
    it('Deve atualizar os dados de um usuário existente', async () => {
      const updatedUser = {
        id: 1,
        username: 'usuarioatualizado',
        password: 'novasenha123',
        person: 1,
      };

      const response = await request(app.getHttpServer()).put('/user').send(updatedUser);

      expect(response.status).toBe(200);
      expect(response.body.username).toBe(updatedUser.username);
      expect(response.body.person).toBe(updatedUser.person);
    });

    it('Deve retornar status 400 para dados inválidos', async () => {
      const invalidUpdate = {
        id: 1,
        username: '',
      };

      const response = await request(app.getHttpServer()).put('/user').send(invalidUpdate);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('/user/:userId (DELETE)', () => {
    it('Deve excluir um usuário pelo ID e retornar status 204', async () => {
      const userId = 1; // Supondo que o ID 1 exista
      const response = await request(app.getHttpServer()).delete(`/user/${userId}`);

      expect(response.status).toBe(204);
    });

    it('Deve retornar status 404 se o usuário não for encontrado', async () => {
      const response = await request(app.getHttpServer()).delete('/user/99999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Usuário não encontrado');
    });
  });
});