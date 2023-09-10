import { Controller, Get, Param, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags, } from '@nestjs/swagger';
import { UserService } from 'src/services/user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('users')
@ApiTags("Usuários")

@ApiResponse({
    status: 201,
    description: 'Created',
})
@ApiResponse({
    status: 202,
    description: 'Accepted',
})
@ApiResponse({
    status: 204,
    description: 'No Content',
})
@ApiResponse({
    status: 404,
    description: 'User Not Found',
})
@ApiResponse({
    status: 500,
    description: 'Internal Server Error',
})
@ApiResponse({
    status: 400,
    description: 'Bad Request - Verify request',
})
@ApiResponse({
    status: 401,
    description: 'Unauthorized - Incorrect Credentials',
})
export class UsersController {

    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Response OK',
        schema: {
            example: [
                {
                    "email": "example@gmail.com",
                    "nome": "Example name",
                    "id": 1
                }
            ]
        }
    })
    findAll() {
        return this.userService.procurarTodos()
    }

    @Get("/id/:id")
    @ApiResponse({
        status: 200,
        description: 'Response OK',
        schema: {
            example:
            {
                "email": "example@gmail.com",
                "nome": "Example name",
                "id": 1
            }

        }
    })
    findById(
        @Param("id") id: number
    ) {
        return this.userService.procurarPorId(id)
    }

    @Get("/email/:email")
    @ApiResponse({
        status: 200,
        description: 'Response OK',
        schema: {
            example:
            {
                "email": "example@gmail.com",
                "nome": "Example name",
                "id": 1
            }

        }
    })
    findByemail(
        @Param("email") email: string
    ) {
        return this.userService.procurarPorEmail(email)
    }

    @Post("login")
    @HttpCode(200)
    @ApiResponse({
        status: 200,
        description: 'Login success',
        schema: {
            example:
            {
                "email": "example@gmail.com",
                "nome": "Example name",
                "id": 1
            }

        }
    })
    login(
        @Body() dto: LoginUserDto
    ) {
        return this.userService.login(dto.email, dto.senha)
    }

    @Get("email/:email/recuperarSenha")
    @ApiResponse({
        status: 200,
        description: 'Email sended',
    })
    @HttpCode(202)
    sendRecoveryPassword(
        @Param("email") email: string
    ) {
        return this.userService.enviarSenhaEmail(email)
    }

    @Post()
    save(
        @Body() dto: CreateUserDto
    ) {
        return this.userService.salvar({ ...dto })
    }

}
