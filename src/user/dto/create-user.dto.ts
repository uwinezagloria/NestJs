import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsEnum(['ADMIN', 'ENGINEER'], { message: 'valid role required' })
  role: 'ADMIN' | 'ENGINEER';
}
