import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  name: string;
  @Column('varchar')
  mimType: string;
  @Column('varchar')
  data: string;
  @ManyToOne(() => Todo, (todo) => todo.files)
  todo: Todo;
}
