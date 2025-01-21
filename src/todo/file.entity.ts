import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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
  @Column('bytea')
  data: Buffer;
  @OneToOne(() => Todo, { cascade: true })
  @JoinColumn() // file sera la que tenga la clave foranea
  todo: Todo;
}
