import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CategoryUpdateDTO {
	@IsNotEmpty()
	@IsNumberString()
	id: number;

	@IsString()
	name?: string;

	@IsNumberString()
	parentId?: number;
}
