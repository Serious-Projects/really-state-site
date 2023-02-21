import { IsDataURI, IsString } from 'class-validator';

export class CreatePropertyDto {
	@IsString() title: string;
	@IsString() description: string;
	@IsString() propertyType: string;
	@IsString() location: string;
	@IsString() price: string;
	@IsDataURI() photo: string;
	@IsString() email: string;
}
