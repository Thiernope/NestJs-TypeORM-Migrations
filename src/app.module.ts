import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: ['dist/**/*.entity.js'],
    //   // synchronize: true,
    // }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
