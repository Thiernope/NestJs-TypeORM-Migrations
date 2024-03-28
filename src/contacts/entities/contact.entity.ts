import { Employee } from 'src/employess/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ name: 'employee_id' })
  employee_id: string;

  @OneToOne(() => Employee, (employee) => employee.contact, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
