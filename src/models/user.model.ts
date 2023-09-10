import { ImagemGaleria, LembreteMedicamento } from "@prisma/client"

export class UserModel {
    id: number
    nome: string
    email: string
    senha: string
    lembretes?: LembreteMedicamento
    imagensGaleria?: ImagemGaleria
}