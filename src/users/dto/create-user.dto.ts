import { IsNotEmpty, IsString, IsEnum, IsEmail } from 'class-validator';
import { User, UserRole } from 'src/schemas/users.schema';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  password: string;

  @IsEnum(UserRole, { message: 'role must be either admin or user' })
  role: UserRole = UserRole.User;
}

export class ResponseUserDto {
  message: string;
  data: User;
}

export class LoginUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
