import { IsNotEmpty, IsNumber } from 'class-validator';

export class CategoryCreateDTO {
	@IsNotEmpty()
	name: string;

	@IsNumber()
	parentId?: number;
}
