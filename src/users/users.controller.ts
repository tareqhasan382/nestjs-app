import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  // Dependency injection
  constructor(private userService: UsersService) {}
  // TODO: Create data
  @Post('')
  @UsePipes(ValidationPipe)
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
  // TODO: Retrive all data
  @Get('')
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
