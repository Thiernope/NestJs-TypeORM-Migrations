import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}
  findAll() {
    return this.contactRepository.find({
      relations: {
        employee: true,
      },
    });
  }

  createContact(createContactDto: CreateContactDto) {
    const newContact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(newContact);
  }
}
