import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { PropertyController } from './properties.controller';
import { PropertyService } from './properties.service';
import { Property, PropertySchema } from './property.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Property.name, schema: PropertySchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	controllers: [PropertyController],
	providers: [PropertyService],
})
export class PropertyModule {}
