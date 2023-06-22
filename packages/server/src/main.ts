import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// cors 허용
	app.enableCors();

	await app.listen(3000);
}
bootstrap();
