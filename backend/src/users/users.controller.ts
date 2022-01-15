import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseInterceptors,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { NotFoundInterceptor } from 'src/interceptors/NotFoundInterceptor';
import { UserUpdateDTO } from './dto/UserUpdateDTO';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UserService) {}

	@Get('/find')
	@UseInterceptors(
		new NotFoundInterceptor('No user found for given search string'),
	)
	find(
		@Query('id') id?: string,
		@Query('email') email?: string,
	): Promise<User> {
		if (id) {
			return this.userService.one({
				id: Number(id),
			});
		} else if (email) {
			return this.userService.one({
				email,
			});
		}
		throw new BadRequestException(
			'You need to specify id or email as query parameters',
		);
	}

	@Get()
	findAll(): Promise<User[]> {
		return this.userService.users({});
	}

	@Post()
	create(@Body() userData: Prisma.UserCreateInput): Promise<User> {
		return this.userService.new(userData);
	}

	@Put()
	update(@Body() updateData: UserUpdateDTO) {
		return this.userService.update({ ...updateData });
	}

	@Delete(':id')
	@UseInterceptors(new NotFoundInterceptor('No user found for given id'))
	delete(@Param('id') id: string): Promise<User> {
		return this.userService.delete({
			id: Number(id),
		});
	}
}
