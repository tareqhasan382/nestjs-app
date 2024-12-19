import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
  // TODO: here constractor
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  // TODO: create data
  async create(userData: User) {
    const result = await this.userModel.create(userData);
    return { message: 'created successfully', data: result };
  }
  //TODO: Retrive all data
  async findAll() {
    const result = await this.userModel.find();
    return { message: 'Retrive all data successfully', data: result };
  }
  //TODO: Retrive single data
  async findOne(id: string) {
    const result = await this.userModel.findById(id);
    return { message: 'retrive single data', data: result };
  }
  //TODO: Edit data
  async edit(id: string, userData: any) {
    const result = await this.userModel.findByIdAndUpdate(id, userData, {
      upsert: true,
    });
    return { message: 'updated successfully', data: result };
  }
  //TODO: Delete data
  async delete(id: string) {
    const result = await this.userModel.findByIdAndDelete(id);
    return { message: 'deleted successfully', data: result };
  }
}
