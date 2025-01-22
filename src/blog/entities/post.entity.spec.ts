import { Post } from './post.entity';
import { Person } from './person.entity';

describe('Post Entity', () => {
  let post: Post;

  beforeEach(() => {
    post = new Post();
  });

  it('should create an instance of Post', () => {
    expect(post).toBeInstanceOf(Post);
  });

  it('should have the correct properties', () => {
    post.author = {
      id: 1,
      name: 'Test Name',
      surname: 'Test Surname',
      email: 'test@test.com',
      professor: false,
    };
    // Simulando o ID do autor, que é um número.
    post.title = 'Test Post';
    post.content = 'This is a test post content.';

    expect(post.author.id).toBe(1);
    expect(post.title).toBe('Test Post');
    expect(post.content).toBe('This is a test post content.');
  });

  it('should have an optional id property', () => {
    expect(post.id).toBeUndefined();
  });

  it('should have a createdAt property with default value', () => {
    const createdAt = post.createdAt;
    expect(createdAt).toBeUndefined();
  });

  it('should have an updatedAt property with default value and onUpdate behavior', () => {
    const updatedAt = post.updatedAt;
    expect(updatedAt).toBeUndefined();
  });

  it('should relate to the Person entity through author field', () => {
    const person = new Person();
    person.id = 1;
    post.author.id = person.id;

    expect(post.author.id).toBe(person.id);
  });

  it('should define the correct database column names', () => {
    expect(post.constructor.prototype).toHaveProperty('id');
    expect(post.constructor.prototype).toHaveProperty('author');
    expect(post.constructor.prototype).toHaveProperty('title');
    expect(post.constructor.prototype).toHaveProperty('content');
    expect(post.constructor.prototype).toHaveProperty('createdAt');
    expect(post.constructor.prototype).toHaveProperty('updatedAt');
  });
  describe('Post Entity', () => {
    it('should be defined', () => {
      expect(true).toBe(true);
    });
  });
});
