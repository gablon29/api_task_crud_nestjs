import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Todo } from './todo.entity';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar')
  name: string;
  @Column('varchar')
  data_url: string;
  @ManyToOne(() => Todo, (todo) => todo.files)
  todo: Todo;
}
