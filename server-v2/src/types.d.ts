import mongoose from 'mongoose';
import { Property } from './features/properties/property.schema';
import { User } from './features/user/user.schema';

export type PropertyQueryType = {
	_start: number;
	_end: number;
	_order: mongoose.SortOrder;
	_sort: string;
	title_like: string;
	propertyType: string;
};

export type ImageFileOptionsType = {
	mime: ('image/jpg' | 'image/png' | 'image/jpeg')[];
};

export type PropertyDocument = HydratedDocument<Property>;
export type UserDocument = HydratedDocument<User>;
