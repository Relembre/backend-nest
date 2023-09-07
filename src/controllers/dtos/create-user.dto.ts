import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: `example@gmail.com`
    })
    email: string


    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    @ApiProperty({
        example: `Example name`
    })
    nome: string


    @IsNotEmpty()
    @MinLength(8) // minimo 8 caracteres
    @MaxLength(20)
    @ApiProperty()
    @ApiProperty({
        example: `SenhaSegura8Digitos`
    })
    senha: string
}