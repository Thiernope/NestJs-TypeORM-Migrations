import { Page } from 'src/pages/entities/page.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ name: 'page_id' })
  page_id: number;

  @ManyToOne(() => Page, (page) => page.questions)
  @JoinColumn({ name: 'page_id' })
  page: Page;
}
