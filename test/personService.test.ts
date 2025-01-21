import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PersonService } from '../services/person.service';
import { PersonRepository } from '../repositories/person.repository';
import { IPerson } from '../entities/models/person.interface';

describe('PersonService', () => {
  let personService: PersonService;
  let personRepository: PersonRepository;

  const mockPersonRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    createPerson: jest.fn(),
    updatePerson: jest.fn(),
    deletePerson: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: PersonRepository, useValue: mockPersonRepository },
      ],
    }).compile();

    personService = module.get<PersonService>(PersonService);
    personRepository = module.get<PersonRepository>(PersonRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPerson', () => {
    it('deve retornar uma pessoa existente pelo ID', async () => {
      const mockPerson: IPerson = { id: 1, name: 'Teste', surname: 'Sobrenome', email: 'teste@exemplo.com', professor: true };
      mockPersonRepository.findById.mockResolvedValue(mockPerson);

      const result = await personService.getPerson(1);
      expect(result).toEqual(mockPerson);
      expect(personRepository.findById).toHaveBeenCalledWith(1);
    });

    it('deve lançar uma exceção se a pessoa não for encontrada', async () => {
      mockPersonRepository.findById.mockResolvedValue(null);

      await expect(personService.getPerson(999)).rejects.toThrow(NotFoundException);
      expect(personRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('getAllPerson', () => {
    it('deve retornar uma lista de pessoas paginada', async () => {
      const mockPersons = [
        { id: 1, name: 'Teste1', surname: 'Sobrenome1', email: 'teste1@exemplo.com', professor: true },
        { id: 2, name: 'Teste2', surname: 'Sobrenome2', email: 'teste2@exemplo.com', professor: false },
      ];
      mockPersonRepository.findAll.mockResolvedValue(mockPersons);

      const result = await personService.getAllPerson(10, 1);
      expect(result).toEqual(mockPersons);
      expect(personRepository.findAll).toHaveBeenCalledWith(10, 1);
    });
  });

  describe('createPerson', () => {
    it('deve criar uma nova pessoa', async () => {
      const mockPerson: IPerson = { name: 'Novo', surname: 'Sobrenome', email: 'novo@exemplo.com', professor: true };
      mockPersonRepository.createPerson.mockResolvedValue({ id: 1, ...mockPerson });

      const result = await personService.createPerson(mockPerson);
      expect(result).toEqual({ id: 1, ...mockPerson });
      expect(personRepository.createPerson).toHaveBeenCalledWith(mockPerson);
    });
  });

  describe('updatePerson', () => {
    it('deve atualizar os dados de uma pessoa', async () => {
      const mockPerson: IPerson = { id: 1, name: 'Atualizado', surname: 'Teste', email: 'atualizado@exemplo.com', professor: false };
      mockPersonRepository.updatePerson.mockResolvedValue(mockPerson);

      const result = await personService.updatePerson(mockPerson);
      expect(result).toEqual(mockPerson);
      expect(personRepository.updatePerson).toHaveBeenCalledWith(mockPerson);
    });
  });

  describe('deletePerson', () => {
    it('deve excluir uma pessoa existente pelo ID', async () => {
      const mockPerson: IPerson = { id: 1, name: 'Teste', surname: 'Sobrenome', email: 'teste@exemplo.com', professor: true };
      mockPersonRepository.findById.mockResolvedValue(mockPerson);
      mockPersonRepository.deletePerson.mockResolvedValue(true);

      const result = await personService.deletePerson(1);
      expect(result).toBe(true);
      expect(personRepository.findById).toHaveBeenCalledWith(1);
      expect(personRepository.deletePerson).toHaveBeenCalledWith(mockPerson);
    });

    it('deve lançar uma exceção se a pessoa não for encontrada para exclusão', async () => {
      mockPersonRepository.findById.mockResolvedValue(null);

      await expect(personService.deletePerson(999)).rejects.toThrow(NotFoundException);
      expect(personRepository.findById).toHaveBeenCalledWith(999);
    });
  });
});
