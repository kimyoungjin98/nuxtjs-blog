import { BadRequestException, Body, ConflictException, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDTO, RegisterDTO, UserDTO } from './dtos/auth.dto';
import { Auth } from './decorator/auth.decorator';
import { GetUser } from './decorator/user.decorator';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { AuthUtil } from './auth.util';
import { AccessTokenPayload, RefreshTokenPayload } from 'blog-interface';

@ApiTags('Auth')
@Controller({ version: '1' })
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly authUtil: AuthUtil
	) { }

	@Get()
	@Auth()
	@ApiOperation({ summary: '사용자 조회', description: '로그인한 사용자를 조회합니다.' })
	async getUser(
		@GetUser() user: User
	) {
		return plainToInstance(UserDTO, user);
	}

	@Post('login')
	async login(
		@Body() body: LoginDTO
	) {
		const user = await this.authService.findByEmail(body.email);
		if (!user) {
			throw new NotFoundException('존재하지 않는 사용자입니다.');
		}
		const isCompare = await this.authUtil.comparePassword(body.password, user.password);
		if (!isCompare) {
			throw new BadRequestException('아이디 또는 비밀번호가 일치하지 않습니다.');
		}

		const payload: AccessTokenPayload = {
			id: user.id,
		}
		const refreshPayload: RefreshTokenPayload = {
			id: user.id,
			isRefreshToken: true,
		}
		const accessToken = await this.authUtil.generateAccessToken(payload);
		const refreshToken = await this.authUtil.generateRefreshToken(refreshPayload);

		return {
			accessToken,
			refreshToken,
		};
	}

	@Post('register')
	@ApiOperation({ summary: '사용자 등록', description: '사용자를 등록합니다.' })
	async register(
		@Body() body: RegisterDTO
	) {
		if (body.password !== body.passwordConfirm) {
			throw new BadRequestException('비밀번호가 일치하지 않습니다.');
		}

		const user = await this.authService.findByEmail(body.email);
		if (user) {
			throw new ConflictException('이미 존재하는 사용자입니다.');
		}

		const registered = await this.authService.register(body);

		return plainToInstance(UserDTO, registered);
	}
}
