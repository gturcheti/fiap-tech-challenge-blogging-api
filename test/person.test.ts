// Arquivo: tests/person.test.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PersonController (e2e)', () => {
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

  describe('/person/:personId (GET)', () => {
    it('Deve retornar os dados de uma pessoa pelo ID', async () => {
      const personId = 1; // Supondo que o ID 1 exista
      const response = await request(app.getHttpServer()).get(`/person/${personId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', personId);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('surname');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('professor');
    });

    it('Deve retornar status 404 se a pessoa não for encontrada', async () => {
      const response = await request(app.getHttpServer()).get('/person/99999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Pessoa não encontrada');
    });
  });

  describe('/person (GET)', () => {
    it('Deve retornar uma lista paginada de pessoas', async () => {
      const response = await request(app.getHttpServer()).get('/person?limit=10&page=1');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((person: any) => {
        expect(person).toHaveProperty('id');
        expect(person).toHaveProperty('name');
        expect(person).toHaveProperty('surname');
        expect(person).toHaveProperty('email');
        expect(person).toHaveProperty('professor');
      });
    });

    it('Deve retornar status 400 para parâmetros inválidos', async () => {
      const response = await request(app.getHttpServer()).get('/person?limit=invalid&page=1');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('/person (POST)', () => {
    it('Deve criar uma nova pessoa e retornar os dados criados', async () => {
      const newPerson = {
        name: 'Teste',
        surname: 'Sobrenome',
        email: 'teste@exemplo.com',
        professor: true,
      };

      const response = await request(app.getHttpServer()).post('/person').send(newPerson);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newPerson.name);
      expect(response.body.surname).toBe(newPerson.surname);
      expect(response.body.email).toBe(newPerson.email);
      expect(response.body.professor).toBe(newPerson.professor);
    });

    it('Deve retornar status 400 se os dados forem inválidos', async () => {
      const invalidPerson = {
        name: '',
        surname: 'Sobrenome',
        email: 'email-invalido',
        professor: true,
      };

      const response = await request(app.getHttpServer()).post('/person').send(invalidPerson);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('/person (PUT)', () => {
    it('Deve atualizar os dados de uma pessoa existente', async () => {
      const updatedPerson = {
        id: 1,
        name: 'Atualizado',
        surname: 'Teste',
        email: 'atualizado@exemplo.com',
        professor: false,
      };

      const response = await request(app.getHttpServer()).put('/person').send(updatedPerson);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedPerson.name);
      expect(response.body.email).toBe(updatedPerson.email);
    });

    it('Deve retornar status 400 para dados inválidos', async () => {
      const invalidUpdate = {
        id: 1,
        name: '',
      };

      const response = await request(app.getHttpServer()).put('/person').send(invalidUpdate);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Validation failed');
    });
  });

  describe('/person/:personId (DELETE)', () => {
    it('Deve excluir uma pessoa pelo ID e retornar status 204', async () => {
      const personId = 1; // Supondo que o ID 1 exista
      const response = await request(app.getHttpServer()).delete(`/person/${personId}`);

      expect(response.status).toBe(204);
    });

    it('Deve retornar status 404 se a pessoa não for encontrada', async () => {
      const response = await request(app.getHttpServer()).delete('/person/99999');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Pessoa não encontrada');
    });
  });
});
