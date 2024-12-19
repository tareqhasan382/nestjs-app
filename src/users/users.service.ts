import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import {
  CreateUserDto,
  LoginUserDto,
  ResponseUserDto,
} from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  // TODO: here constractor
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    // private readonly userModel: UsersService,
  ) {}
  // TODO: create data
  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const { name, email, password } = createUserDto;
    //TODO:Check if user is in user
    const emailInUse = await this.userModel.findOne({ email: email });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    //TODO:Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    //TODO:Create user document and save database
    const result = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return { message: 'created successfully', data: result };
  }
  async login(credentials: LoginUserDto) {
    const { email, password } = credentials;
    //Find if user exists by email
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    // compare entered password with existing password
    const paswordMatch = await bcrypt.compare(password, user.password);
    if (!paswordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const accessToken = this.jwtService.sign(
      { email: user.email, role: user.role },
      { expiresIn: '1h' },
    );

    return accessToken;
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
