import { Injectable, CanActivate, ExecutionContext, HttpException, NotFoundException } from "@nestjs/common";
import { AuthUtil } from "../auth.util";
import { PrismaService } from "prisma/prisma.service";
import { AccessTokenPayload } from "blog-interface";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authUtil: AuthUtil,
		private prismaService: PrismaService
	) { }

	async canActivate(
		context: ExecutionContext
	): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const headers = request.headers;

		const hasAuthorization = headers.hasOwnProperty('authorization');
		if (!hasAuthorization) {
			throw new HttpException('사용자 정보를 찾을 수 없습니다', 498);
		}

		const authorization = headers.authorization.split(' ') as string[];
		if (authorization.length < 2) {
			throw new HttpException('사용자 정보를 찾을 수 없습니다', 498);
		}

		const hasBearer = authorization[0].toLowerCase().startsWith('bearer');
		if (!hasBearer) {
			throw new HttpException('사용자 정보를 찾을 수 없습니다', 498);
		}

		const authToken = authorization[1];
		let payload: AccessTokenPayload;
		try {
			payload = this.authUtil.verifyAccessToken(authToken);
		} catch (e) {
			throw new HttpException('사용할 수 없는 토큰입니다.', 498);
		}
		if (!payload) {
			throw new HttpException('사용할 수 없는 토큰입니다.', 498);
		}

		const { id } = payload;
		const user = await this.prismaService.user.findUnique({
			where: { id },
		});
		if (!user) {
			throw new NotFoundException('사용자 정보를 찾을 수 없습니다.');
		}
		request.user = user;

		return true;

	}
}