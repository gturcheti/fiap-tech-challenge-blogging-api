import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from '../services/person.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { ParseIntPipe } from '@nestjs/common';

describe('PersonController', () => {
  let personController: PersonController;
  let personService: PersonService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: {
            getPerson: jest.fn(),
            getAllPerson: jest.fn(),
            createPerson: jest.fn(),
            updatePerson: jest.fn(),
            deletePerson: jest.fn(),
          },
        },
      ],
    }).compile();

    personController = app.get<PersonController>(PersonController);
    personService = app.get<PersonService>(PersonService);
  });

  describe('getPerson', () => {
    it('should return a person by id', async () => {
      const personId = 1;
      const result = { id: personId, name: 'John', surname: 'Doe', email: 'john.doe@example.com', professor: false };
      jest.spyOn(personService, 'getPerson').mockResolvedValue(result);

      expect(await personController.getPerson(personId)).toBe(result);
    });
  });

  describe('getAllPerson', () => {
    it('should return a list of people', async () => {
      const result = [
        { id: 1, name: 'John', surname: 'Doe', email: 'john.doe@example.com', professor: false },
        { id: 2, name: 'Jane', surname: 'Smith', email: 'jane.smith@example.com', professor: true },
      ];
      jest.spyOn(personService, 'getAllPerson').mockResolvedValue(result);

      expect(await personController.getAllPerson(10, 1)).toBe(result);
    });
  });

  describe('createPerson', () => {
    it('should create a new person', async () => {
      const newPerson = { name: 'John', surname: 'Doe', email: 'john.doe@example.com', professor: false };
      const result = { id: 1, ...newPerson };
      jest.spyOn(personService, 'createPerson').mockResolvedValue(result);

      expect(await personController.createPerson(newPerson)).toBe(result);
    });
  });

  describe('updatePerson', () => {
    it('should update an existing person', async () => {
      const updatedPerson = { id: 1, name: 'John', surname: 'Doe', email: 'john.doe@example.com', professor: false };
      jest.spyOn(personService, 'updatePerson').mockResolvedValue(updatedPerson);

      expect(await personController.updatePerson(updatedPerson)).toBe(updatedPerson);
    });
  });

  describe('deletePerson', () => {
    it('should delete a person by id', async () => {
      const personId = 1;
      jest.spyOn(personService, 'deletePerson').mockResolvedValue(undefined); // Retorna `undefined` para simular void
  
      await expect(personController.deletePerson(personId)).resolves.toBeUndefined(); // Verifica que o retorno é `undefined`
    });
  });
});
