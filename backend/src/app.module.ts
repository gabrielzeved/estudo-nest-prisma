import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma.module';

@Module({
	imports: [PrismaModule, UsersModule, CategoriesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
