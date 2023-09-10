import { UserModel } from "./user.model";

export class ImageGalleryModel {

    id?: number;
    imagem: string;
    descricao: string;

    userId?: number
    user?: UserModel
}