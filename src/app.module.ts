import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employess/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from './contacts/contact.module';
import { BooksModule } from './books/books.module';
import { PagesModule } from './pages/pages.module';
import { QuestionsModule } from './questions/questions.module';
import { ResponsesModule } from './responses/responses.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: ['dist/**/*.entity.js'],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot(dataSourceOptions),
    EmployeeModule,
    ContactModule,
    BooksModule,
    PagesModule,
    QuestionsModule,
    ResponsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
