import { Contact } from 'src/contacts/entities/contact.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @OneToOne(() => Contact, (contact) => contact.employee)
  contact: Contact;
}
