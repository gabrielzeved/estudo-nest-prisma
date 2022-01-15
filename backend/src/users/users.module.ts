import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
	controllers: [UsersController],
	providers: [UserService, PrismaService],
})
export class UsersModule {}
