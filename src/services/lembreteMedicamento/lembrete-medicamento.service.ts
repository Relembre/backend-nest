import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { DiaSemana } from "src/models/dia-semana.model";
import { CreateMedicationRemind } from "src/controllers/dtos/create-medication-remind.dto";

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

    async create(diaSemana: DiaSemana, descricao: string, idUser: number, horario: string, nome: string) {
        this.logger.log(`Creating lembrete for user id ${idUser}`)
        return this.prisma.lembreteMedicamento.create({
            data: {
                descricao,
                horario,
                nome,
                diaSemana: +diaSemana,
                user: {
                    connect: {
                        id: +idUser
                    }
                }
            }
        })
    }

    async updateReminder(id: number, { descricao, diaSemanaLembrete, horario, nome }: CreateMedicationRemind) {
        this.logger.log(`Updating reminder with id = ${id}`)
        return this.prisma.lembreteMedicamento.update({
            data: {
                descricao,
                horario,
                nome,
                diaSemana: +diaSemanaLembrete,
            },
            where: {
                id: +id
            }
        })
    }

    async deleteReminder(id: number) {
        this.logger.log(`Deleting reminder with id = ${id}`)
        return this.prisma.lembreteMedicamento.delete({
            where: {
                id: +id
            }
        })
    }

    async findAll() {
        return await this.prisma.lembreteMedicamento.findMany()
    }
}