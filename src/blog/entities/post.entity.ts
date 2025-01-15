import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IPost } from './models/post.interface';
import { Person } from './person.entity';
import { IPerson } from './models/person.interface';

@Entity()
export class Post implements IPost {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id?: string | undefined;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'author' })
  author: IPerson;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
