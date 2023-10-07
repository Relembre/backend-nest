import { ApiProperty } from "@nestjs/swagger"
import { IsEmail } from "class-validator"

export class LoginUserDto {
    @IsEmail()
    @ApiProperty({
        example: 'teste@email.com'
    })
    email: string
    @ApiProperty({
        example: "12345678"
    })
    senha: string
}