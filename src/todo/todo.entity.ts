import { User } from 'src/Users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  title: string;
  @Column('boolean')
  completed: boolean;
  @ManyToOne(() => User, (user) => user.todo_id)
  user: User;
}
