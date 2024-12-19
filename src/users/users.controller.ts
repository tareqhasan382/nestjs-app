import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/role.decorator';
import { AuthGuard } from './auth.guard';

@Controller('users')
export class UsersController {
  // Dependency injection
  constructor(private userService: UsersService) {}
  // TODO: Create data
  @Post('signup')
  @UsePipes(ValidationPipe)
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
  // TODO: Login user
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginData: LoginUserDto) {
    return this.userService.login(loginData);
  }
  // TODO: Retrive all data
  @Get('')
  @UseGuards(AuthGuard) // Use RolesGuard to protect this route
  @Roles(Role.User) // Only 'admin' role can access this route
  async findAll() {
    return this.userService.findAll();
  }
  // TODO: Retrive single data
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  // TODO: update data
  @Patch(':id')
  async editUser(@Param('id') id: string, @Body() userData: any) {
    return this.userService.edit(id, userData);
  }
  // TODO: Delete data
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
