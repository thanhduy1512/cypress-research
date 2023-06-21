import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PatchUserDto } from './dto/patch-user.dto';

export interface IUserEntity {
  _id: string;
  username: string;
}

@Injectable()
export class UserService {
  private saltOrRounds = 10;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const hash = await bcrypt.hash(password, this.saltOrRounds);

    return this.userModel.create({
      username,
      password: hash,
    });
  }

  async patch(user: IUserEntity, patchUserDto: PatchUserDto): Promise<string> {
    const newPassword = await bcrypt.hash(
      patchUserDto.password,
      this.saltOrRounds,
    );

    await this.userModel.updateOne(
      { _id: user._id },
      { password: newPassword },
    );

    return 'Password Updated';
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }
}
