import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name is String' })
  name: string;
  @IsNotEmpty({ message: 'email is required' })
  @IsString()
  email: string;
  @IsNotEmpty({ message: 'age is required' })
  @IsNumber()
  age: number;
}
