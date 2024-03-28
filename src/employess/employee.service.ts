import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}
  findAll() {
    return this.employeeRepository.find({
      relations: {
        contact: true,
      },
    });
  }
  createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const newEmployee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(newEmployee);
  }

  async remove(id: any) {
    const employeeToRemove = await this.employeeRepository.findOneBy({ id });
    this.employeeRepository.remove(employeeToRemove);
  }
}
