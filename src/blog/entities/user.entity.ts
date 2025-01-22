import { IUser } from '../../blog/entities/models/user.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from './person.entity';
import { IPerson } from './models/person.interface';

@Entity({ name: 'user' })
export class User implements IUser {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id?: number;

  @Column({ name: 'username', type: 'varchar', length: 255 })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person?: IPerson;
}
