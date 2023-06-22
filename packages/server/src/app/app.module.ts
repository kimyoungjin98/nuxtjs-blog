import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AppRoutingModule } from './app.routing.module';

@Module({
	imports: [PrismaModule, AppRoutingModule],
})
export class AppModule { }
