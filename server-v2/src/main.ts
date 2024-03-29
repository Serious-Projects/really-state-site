import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function runApp() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api/v1');
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	await app.listen(3000);
}

runApp();
