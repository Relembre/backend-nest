import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserModel } from "src/models/user.model";
import { PrismaService } from "./prisma/prisma.service";
import { CreateUserDto } from "src/controllers/dtos/create-user.dto";
import { SendgridService } from "./mail/sendgrid.service";
import { UserMapper } from "src/mappers/user.mapper";
import { ReadUserDto } from "src/controllers/dtos/read-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService,
        private readonly sendgridService: SendgridService) { }

    async procurarTodos(): Promise<ReadUserDto[]> {
        return (await this.prisma.user.findMany()).map(UserMapper.modelToDtoWithNoPass)
    }

    async procurarPorId(id: number): Promise<ReadUserDto> {
        return UserMapper.modelToDtoWithNoPass((await this.prisma.user.findFirstOrThrow({
            where: {
                id: +id
            }
        })))
    }

    async procurarPorEmail(email: string): Promise<ReadUserDto> {
        return UserMapper.modelToDtoWithNoPass(await this.prisma.user.findFirstOrThrow({
            where: {
                email
            },
        }))
    }

    async salvar(dto: CreateUserDto): Promise<ReadUserDto> {
        const createdUser = await this.prisma.user.create({
            data: {
                ...dto
            }
        })

        return UserMapper.modelToDtoWithNoPass(createdUser);
    }

    async login(email: string, senha: string): Promise<ReadUserDto> {
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                email
            }
        })

        if (user.senha === senha) {
            return UserMapper.modelToDtoWithNoPass(user);
        }

        throw new HttpException(`Incorrect Credentials for ${email}`, HttpStatus.UNAUTHORIZED)
    }

    async enviarSenhaEmail(email: string) {

        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                email
            }
        })

        this.sendgridService.send({
            from: 'relembre@gmail.com',
            to: email,
            subject: "Esqueci minha senha - Relembre",
            html: `
            <h1>Ola ${user.nome}, tudo bem?</h1><br>
            <p>Viemos te ajudar com sua senha, tome cuidado e guarde em um lugar seguro</p>
            <p>sua senha eh ${user.senha}</p>
            `
        })


    }
}