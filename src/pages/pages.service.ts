import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
// import { UpdatePageDto } from './dto/update-page.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
  ) {}
  create(createPageDto: CreatePageDto) {
    const newPage = this.pageRepository.create(createPageDto);
    return this.pageRepository.save(newPage);
  }

  findAll() {
    return this.pageRepository.find({
      relations: {
        book: true,
        questions: true,
      },
    });
  }

  findOne(id: number) {
    return this.pageRepository.findOneBy({ id });
  }

  // update(id: number, updatePageDto: UpdatePageDto) {
  //   return `This action updates a #${id} page`;
  // }

  async remove(id: number) {
    const page = await this.pageRepository.findOneBy({ id });
    return this.pageRepository.remove(page);
  }
}
