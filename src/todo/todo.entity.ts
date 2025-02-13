import { User } from 'src/Users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from './file.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text', { nullable: false })
  title: string;
  @Column('text', { nullable: true })
  description: string;
  @Column('boolean', { default: false })
  completed: boolean;
  @ManyToOne(() => User, (user) => user.todo_id)
  user: User;
  @OneToMany(() => File, (file) => file.todo)
  files: File[];
}
