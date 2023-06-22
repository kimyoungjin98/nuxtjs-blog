export interface IUserDTO {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ILoginDTO {
    email: string;
    password: string;
}
export interface IRegisterDTO {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
export interface ITokenDTO {
    accessToken: string;
    refreshToken: string;
}
