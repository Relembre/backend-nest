import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, MaxLength } from "class-validator"
import { DiaSemana } from "src/models/dia-semana.model"

export class CreateMedicationRemind {
    @IsNotEmpty()
    @MaxLength(150)
    @ApiProperty()
    descricao: string
    @IsNotEmpty()
    @ApiProperty({
        enum: [1, 2, 3, 4, 5, 6, 7]
    })
    diaSemanaLembrete: DiaSemana
    @IsNotEmpty()
    @ApiProperty()
    horario: string

    @IsNotEmpty()
    @ApiProperty()
    nome: string
}