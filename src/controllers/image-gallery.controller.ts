import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ImageGalleryService } from "src/services/imageGallery/image-gallery.service";
import { CreateImageGalleryDto } from "./dtos/create-image-gallery.dto";

@Controller("gallery-images")
@ApiTags("Galeria de Imagens")
export class ImageGalleryController {
    constructor(private readonly imageGalleryService: ImageGalleryService) {
    }

    @Get(":id")
    findImagesGalleryByIdUser(@Param("id") id: number) {
        return this.imageGalleryService.findAllImagesByUser(id)
    }

    @Post(":id")
    create(@Param("id") id: number, @Body() dto: CreateImageGalleryDto) {
        return this.imageGalleryService.create(id, dto)
    }

}