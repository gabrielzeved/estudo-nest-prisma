import { Prisma } from '@prisma/client';

export class UserUpdateDTO {
	where: Prisma.UserWhereUniqueInput;
	data: Prisma.UserUpdateInput;
}
