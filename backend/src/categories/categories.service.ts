import { Injectable } from '@nestjs/common';
import { Category, Prisma, Product, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
	constructor(private prisma: PrismaService) {}

	async create(
		createCategoryDto: Prisma.CategoryCreateInput,
	): Promise<Category> {
		return await this.prisma.category.create({
			data: createCategoryDto,
		});
	}

	async findMany(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.CategoryWhereUniqueInput;
		where?: Prisma.CategoryWhereInput;
		orderBy?: Prisma.CategoryOrderByWithRelationInput;
	}) {
		const { skip, take, cursor, where, orderBy } = params;
		return await this.prisma.category.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async findOne(
		categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
	): Promise<Category | null> {
		return await this.prisma.category.findUnique({
			where: categoryWhereUniqueInput,
		});
	}

	update(params: {
		where: Prisma.CategoryWhereUniqueInput;
		data: Prisma.CategoryUpdateInput;
	}): Promise<Category> {
		const { where, data } = params;
		return this.prisma.category.update({
			where,
			data,
		});
	}

	async delete(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
		return await this.prisma.category.delete({
			where,
		});
	}

	async products(where: Prisma.CategoryWhereUniqueInput): Promise<Product[]> {
		let products: Product[] = [];
		let atualCategory = this.prisma.category.findUnique({
			where,
			include: {
				products: true,
			},
		});
		products = await atualCategory.products();
		return products;
	}
}
