import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private prismaService: PrismaService
	) { }

	async findByEmail(email: string) {
		const user = await this.prismaService.user.findFirst({
			where: {
				email
			}
		});

		return user;
	}

	async register(body: RegisterDTO) {
		const { name, email, password } = body;
		const user = await this.prismaService.user.create({
			data: {
				name,
				email,
				password: await bcrypt.hash(password, 10),
			}
		});

		return user;
	}
}
