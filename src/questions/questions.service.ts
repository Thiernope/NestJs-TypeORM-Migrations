import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
// import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    const newQuestion = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(newQuestion);
  }

  findAll() {
    return this.questionRepository.find({
      relations: {
        page: true,
      },
    });
  }

  findOne(id: number) {
    return this.questionRepository.findOneBy({ id });
  }

  // update(id: number, updateQuestionDto: UpdateQuestionDto) {
  //   return `This action updates a #${id} question`;
  // }

  async remove(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    return this.questionRepository.remove(question);
  }
}
