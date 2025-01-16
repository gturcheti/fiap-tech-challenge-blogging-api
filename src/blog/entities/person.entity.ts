import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPerson } from './models/person.interface';

@Entity()
export class Person implements IPerson {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id?: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'surname', type: 'varchar', length: 255 })
  surname: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email?: string;

  @Column({ name: 'professor', type: 'boolean' })
  professor: boolean;
}
