import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getUsers(@Query('_end') _end: number) {
		return this.userService.getUsers(_end);
	}

	@Get(':id')
	async getUserById(@Param('id') id: string) {
		return this.userService.getUserById(id);
	}

	@Post()
	async createUser(@Body() user: CreateUserDto) {
		return this.userService.createUser(user);
	}
}
