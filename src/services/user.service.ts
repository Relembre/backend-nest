import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserModel } from "src/models/user.model";
import { PrismaService } from "./prisma/prisma.service";
import { CreateUserDto } from "src/controllers/dtos/create-user.dto";
import { UserMapper } from "src/mappers/user.mapper";
import { ReadUserDto } from "src/controllers/dtos/read-user.dto";
import { MailerService } from "@nestjs-modules/mailer";
import { NotFoundError } from "rxjs";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService, private readonly mailerService: MailerService) { }

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
        try {
            const userExists = await this.procurarPorEmail(dto.email);
            if (userExists) {
                throw new HttpException("Email ja cadastrado", HttpStatus.CONFLICT)
            }
        } catch (err) {
            const createdUser = await this.prisma.user.create({
                data: {
                    ...dto
                }
            })
            return UserMapper.modelToDtoWithNoPass(createdUser);
        }

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
            .catch(err => {
                throw new HttpException(`Usuario nao encontrado, ${JSON.stringify(err)}`, HttpStatus.NOT_FOUND)
            })

        await this.mailerService.sendMail({
            from: 'relembre@gmail.com',
            to: email,
            subject: "Esqueci minha senha - Relembre",
            html: `
            <html>
                <style>
                body {
                    font-family: sans-serif;
                    color: #333;
                }
                div {
                    margin: 0 auto;
                    padding: 16px;
                    border-radius: 4px;
                    border: 1px solid #4448;
                }
            </style> 
            <div>
                <h2>Ola ${user.nome}, tudo bem?</h2>
                <p>Viemos te ajudar com sua senha, tome cuidado e guarde em um lugar seguro</p>
                    <p>Sua senha é: <strong>${user.senha}</strong></p>
            </div>
            </html>`
        })

    }
}