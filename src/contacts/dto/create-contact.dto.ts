import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @Length(7, 10)
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  employee_id: string;
}
