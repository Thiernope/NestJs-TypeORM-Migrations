import { Book } from 'src/books/entities/book.entity';
import { Question } from 'src/questions/entities/question.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'book_id' })
  book_id: number;

  @ManyToOne(() => Book, (book) => book.pages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @OneToMany(() => Question, (question) => question.page)
  questions: Question[];
}
