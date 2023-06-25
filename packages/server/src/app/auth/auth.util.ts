import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload, RefreshTokenPayload } from 'blog-interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthUtil {
	constructor(
		private jwtService: JwtService
	) { }

	comparePassword(password: string, hashedPassword: string): boolean {
		return bcrypt.compareSync(password, hashedPassword);
	}

	generateAccessToken(payload: AccessTokenPayload): string {
		return this.jwtService.sign(payload, {
			expiresIn: '1d'
		});
	}

	generateRefreshToken(payload: RefreshTokenPayload): string {
		return this.jwtService.sign(payload, {
			expiresIn: '7d'
		});
	}

	verifyAccessToken(token: string): AccessTokenPayload {
		return this.jwtService.verify<AccessTokenPayload>(token);
	}

	verifyRefreshToken(token: string): RefreshTokenPayload {
		return this.jwtService.verify<RefreshTokenPayload>(token);
	}

}