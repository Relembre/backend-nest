import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateMedicationRemind } from "./dtos/create-medication-remind.dto";
import { LembreteMedicamentoService } from "src/services/lembreteMedicamento/lembrete-medicamento.service";

@Controller("lembretes")
@ApiTags("Lembretes")
export class LembreteController {

    constructor(
        private readonly lembreteService: LembreteMedicamentoService
    ) {
    }

    @Post(":id")
    create(@Param("id") idUser: number, @Body() dto: CreateMedicationRemind) {
        return this.lembreteService.create(dto.diaSemanaLembrete, dto.descricao, idUser, dto.horario, dto.nome)
    }

    @Get(":id")
    findByUserId(@Param("id") id: number) {
        return this.lembreteService.findLembreteByUserId(id)
    }

    @Put(":id/")
    update(@Param("id") id: number, @Body() dto: CreateMedicationRemind) {
        return this.lembreteService.updateReminder(id, dto)
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.lembreteService.deleteReminder(id)
    }
}