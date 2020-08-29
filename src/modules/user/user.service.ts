import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async find(query): Promise<User[]> {
    return await this.userModel.find(query);
  }

  async findOne(query): Promise<User> {
    return await this.userModel.findOne(query);
  }

  async createUser(query): Promise<User> {
    console.log(query);

    return await this.userModel.create(query);
  }
}
