import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Todo } from 'src/todo/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column({ unique: true })
  email: string;
  @Column({ default: false })
  isAdmin: boolean;
  @Column()
  password: string;
  @DeleteDateColumn()
  deletedAt: Date;
  @OneToMany(() => Todo, (todo) => todo.user)
  todo_id: Todo[];
}
