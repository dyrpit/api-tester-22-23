import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { RegisterUserDto } from 'src/users/dto/create-user.dto';

import { User, UserDocument } from './entity/user.entity';

import { ROLE, SanitizedUser } from './types/user.types';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: RegisterUserDto): Promise<User> {
    const { email, password, role } = data;

    const user = await this.findByEmail(email);

    if (user) {
      throw new HttpException('User already registered', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const newUserData = {
      email,
      password: hashedPassword,
      role: role || ROLE.USER,
    };

    try {
      const newUser = new this.userModel(newUserData);
      return newUser.save();
    } catch (e) {
      throw new HttpException('Could not create tasks', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({});
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean();
  }

  async findOne(id: string): Promise<User> {
    try {
      return this.userModel.findById(id);
    } catch (e) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  getProfile(req: any): SanitizedUser {
    return req.user;
  }
}