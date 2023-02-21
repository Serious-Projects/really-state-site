import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyModule } from './features/properties/property.module';
import { UserModule } from './features/user/user.module';

@Module({
	imports: [
		UserModule,
		PropertyModule,
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URI),
	],
})
export class AppModule {}
