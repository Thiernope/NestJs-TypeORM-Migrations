import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Post()
  createContact(@Body(ValidationPipe) createContactDto: CreateContactDto) {
    return this.contactService.createContact(createContactDto);
  }
}
