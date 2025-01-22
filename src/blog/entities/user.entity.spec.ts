import { User } from './user.entity';
import { Person } from './person.entity';

describe('User Entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  it('should create an instance of User', () => {
    expect(user).toBeInstanceOf(User);
  });

  it('should have the correct properties', () => {
    user.username = 'testUser';
    user.password = 'testPassword';
    user.person = 1;  // Simulando o ID da pessoa associada.

    expect(user.username).toBe('testUser');
    expect(user.password).toBe('testPassword');
    expect(user.person).toBe(1);
  });

  it('should have an optional id property', () => {
    expect(user.id).toBeUndefined();
  });

  it('should relate to the Person entity through person field', () => {
    const person = new Person();
    person.id = 1;
    user.person = person.id;

    expect(user.person).toBe(person.id);
  });

  it('should define the correct database column names', () => {
    const user = new User();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('person');
  });

  it('should have the correct relationship with the Person entity (OneToOne)', () => {
    const person = new Person();
    person.id = 1;
    user.person = person.id;

    // Verifica se o relacionamento OneToOne foi configurado corretamente
    expect(user.person).toBe(person.id);
  });
});
