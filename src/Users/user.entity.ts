import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from 'src/todo/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Todo, (todo) => todo.user)
  todo_id: Todo[];
}
