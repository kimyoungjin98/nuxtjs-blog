import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthUtil } from './auth.util';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [PrismaModule, JwtModule.register({
		privateKey: process.env.JWT_PRIVATE_KEY,
		publicKey: process.env.JWT_PUBLIC_KEY,
		secret: process.env.JWT_SECRET,
	})],
	controllers: [AuthController],
	providers: [AuthService, AuthUtil]
})
export class AuthModule { }
