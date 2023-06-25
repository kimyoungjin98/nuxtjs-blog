import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// cors 허용
	app.enableCors();

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			exceptionFactory: (errors: ValidationError[]) => {
				if (errors && errors.length > 0) {
					const error = errors[0].constraints;
					const keys = Object.keys(error);
					const type = keys[keys.length - 1];
					const message = error[type];
					return new BadRequestException(message);
				}
			}
		})
	)

	const swaggerConfig = new DocumentBuilder()
		.setTitle('HOMEPAGE SOLUTION API')
		.addServer(`http://localhost:4200`)
		.addBearerAuth()
		.setVersion('1.0.0')
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('document', app, document);

	await app.listen(4200);
}

bootstrap();
