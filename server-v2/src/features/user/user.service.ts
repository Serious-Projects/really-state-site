import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../../types.d';
import { CreateUserDto } from './user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async getUsers(_end: number) {
		try {
			const users = await this.userModel.find({}).limit(_end);
			return users;
		} catch (err) {
			throw new InternalServerErrorException(err.message);
		}
	}

	async getUserById(id: string) {
		try {
			const user = await this.userModel.findOne({ _id: id }).populate('allProperties');
			if (!user) throw new NotFoundException('User not found');
			return user;
		} catch (err) {
			throw new InternalServerErrorException(err.message);
		}
	}

	async createUser(userDto: CreateUserDto) {
		try {
			const createdUser = new this.userModel(userDto);
			await createdUser.save();
			return createdUser;
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}
}
