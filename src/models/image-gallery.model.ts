import { UserModel } from "./user.model";

export class ImageGalleryModel {

    id?: number;
    imagem: any;
    descricao: string;

    userId?: number
    user?: UserModel
}