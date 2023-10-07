import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ImageGalleryModel } from "src/models/image-gallery.model";
import { CreateImageGalleryDto } from "src/controllers/dtos/create-image-gallery.dto";

@Injectable()
export class ImageGalleryService {

    private logger = new Logger(ImageGalleryService.name)

    constructor(private readonly prisma: PrismaService) {
    }

    async create(idUser: number, { descricao, imagem }: CreateImageGalleryDto): Promise<ImageGalleryModel> {

        this.logger.log(`Adding image gallery into user id ${idUser}`)
        const imgBytes = Buffer.from(imagem)
        const imageGallery = {
            descricao,
            imagem: imgBytes
        }
        return await this.prisma.imagemGaleria.create({
            data: {
                ...imageGallery,
                user: {
                    connect: {
                        id: +idUser
                    }
                }
            }
        })
    }

    async findAllImagesByUser(id: number): Promise<ImageGalleryModel[]> {
        this.logger.log(`Finding images from User id ${id}`)
        const data = await this.prisma.imagemGaleria.findMany({
            where: {
                userId: +id
            }
        })

        return data.map((val => {
            return {
                ...val,
                imagem: val.imagem.toString()
            }
        }))
    }
}