import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	getUserById(@Param('id') id: string): Promise<User> {
		return this.userService.one({
			id: Number(id),
		});
	}

	@Post()
	createUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
		return this.userService.new(userData);
	}
}
