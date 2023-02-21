import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Property {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	propertyType: string;

	@Prop({ required: true })
	location: string;

	@Prop({ required: true })
	price: string;

	@Prop({ required: true })
	photo: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	creator: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
