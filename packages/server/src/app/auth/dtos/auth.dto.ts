import { ILoginDTO, IRegisterDTO, IUserDTO } from "blog-interface";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class LoginDTO implements ILoginDTO {
	@ApiProperty()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;
}

export class RegisterDTO implements IRegisterDTO {

	@ApiProperty()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	passwordConfirm: string;
}

export class UserDTO implements IUserDTO {

	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	email: string;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;
}