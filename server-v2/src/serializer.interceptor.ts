import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

interface ClassConstructor {
	new (...args: any): object;
}

export class Serializer implements NestInterceptor {
	constructor(private dto: ClassConstructor) {}

	intercept(context: ExecutionContext, handler: CallHandler) {
		return handler.handle().pipe(
			map((data: any) => {
				return plainToInstance(this.dto, data, {
					excludeExtraneousValues: true,
				});
			}),
		);
	}
}
