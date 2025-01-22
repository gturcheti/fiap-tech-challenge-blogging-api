import { Person } from './person.entity';

describe('Person Entity', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person();
  });

  it('should create an instance of Person', () => {
    expect(person).toBeInstanceOf(Person);
  });

  it('should have the correct properties', () => {
    person.name = 'John';
    person.surname = 'Doe';
    person.email = 'john.doe@example.com';
    person.professor = false;

    expect(person.name).toBe('John');
    expect(person.surname).toBe('Doe');
    expect(person.email).toBe('john.doe@example.com');
    expect(person.professor).toBe(false);
  });

  it('should have an optional id property', () => {
    expect(person.id).toBeUndefined();
  });
  describe('Person Entity', () => {
    it('should be defined', () => {
      expect(true).toBe(true);
    });
  });
});
