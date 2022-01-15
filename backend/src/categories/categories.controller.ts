import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe,
} from '@nestjs/common';
import ObjectOrUndefined from 'src/common/ObjectOrUndefined';
import { CategoriesService } from './categories.service';
import { CategoryCreateDTO } from './dto/CategoryCreateDTO';
import { CategoryUpdateDTO } from './dto/CategoryUpdateDTO';

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	create(@Body() createCategoryDto: CategoryCreateDTO) {
		return this.categoriesService.create({
			name: createCategoryDto.name,
			parent: ObjectOrUndefined(createCategoryDto.parentId, {
				connect: {
					id: createCategoryDto.parentId,
				},
			}),
		});
	}

	@Patch()
	update(@Body() updateCategoryDto: CategoryUpdateDTO) {
		return this.categoriesService.update({
			where: {
				id: updateCategoryDto.id,
			},
			data: {
				name: updateCategoryDto.name,
				parent: ObjectOrUndefined(updateCategoryDto.parentId, {
					connect: {
						id: updateCategoryDto.parentId,
					},
				}),
			},
		});
	}

	@Get()
	findAll() {
		return this.categoriesService.findMany({});
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.categoriesService.findOne({
			id: id,
		});
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.categoriesService.delete({
			id: Number(id),
		});
	}
}
