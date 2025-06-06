import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserType } from './users.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private UserModel: Model<UserType>) {}

  async create(data: User): Promise<Types.ObjectId> {
    const one = await this.UserModel.create(data);
    return one._id;
  }

  async findAll() {
    const all = await this.UserModel.find();
    return all;
  }

  async findById(id: string) {
    const one = await this.UserModel.findById(id);
    return one;
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    const one = await this.UserModel.findByIdAndUpdate(id, updateUserDto);
    return one;
  }

  async removeById(id: string) {
    const one = await this.UserModel.findByIdAndDelete(id);
    return one;
  }
}
