import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateImageGalleryDto {
    @IsNotEmpty()
    @ApiProperty()
    imagem: any;
    @ApiProperty()
    descricao: string;
}