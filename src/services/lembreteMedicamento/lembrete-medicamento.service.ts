import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DiaSemana } from "src/models/dia-semana.model";

@Injectable()
export class LembreteMedicamentoService {

    private logger = new Logger(LembreteMedicamentoService.name)

    constructor(private readonly prisma: PrismaService) { }

    async findLembreteByUserId(id: number) {
        this.logger.log(`Finding lembretes by id ${id}`)
        return await this.prisma.lembreteMedicamento.findMany({
            where: {
                userId: +id
            }
        })
    }

    async create(diaSemana: DiaSemana, descricao: string, idUser: number) {
        this.logger.log(`Creating lembrete for user id ${idUser}`)
        return this.prisma.lembreteMedicamento.create({
            data: {
                descricao,
                diaSemana: +diaSemana,
                user: {
                    connect: {
                        id: +idUser
                    }
                }
            }
        })
    }

    async findAll() {
        return await this.prisma.lembreteMedicamento.findMany()
    }
}