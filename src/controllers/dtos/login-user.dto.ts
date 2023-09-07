import { IsEmail } from "class-validator"

export class LoginUserDto {
    @IsEmail()
    email: string
    senha: string
}