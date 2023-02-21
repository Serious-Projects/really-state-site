import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class User {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	avatar: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Property' })
	allProperties: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
