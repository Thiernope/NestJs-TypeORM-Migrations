import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
// import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}
  create(createBookDto: CreateBookDto) {
    const newBook = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(newBook);
  }

  findAll() {
    return this.bookRepository.find({
      relations: {
        pages: true,
      },
    });
  }

  findOne(id: number) {
    return this.bookRepository.findOneBy({ id });
  }

  // update(id: number, updateBookDto: UpdateBookDto) {
  //   return `This action updates a #${id} book`;
  // }

  async remove(id: number) {
    const book = await this.bookRepository.findOneBy({ id });
    return this.bookRepository.remove(book);
  }
}
