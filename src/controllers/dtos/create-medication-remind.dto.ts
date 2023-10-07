import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, MaxLength } from "class-validator"
import { DiaSemana } from "src/models/dia-semana.model"

export class CreateMedicationRemind {
    @IsNotEmpty()
    @MaxLength(150)
    @ApiProperty()
    descricao: string
    @IsNotEmpty()
    @ApiProperty({
        enum: DiaSemana
    })
    diaSemanaLembrete: DiaSemana
    @IsNotEmpty()
    @ApiProperty()
    horario: string

    @IsNotEmpty()
    @ApiProperty()
    nome: string
}