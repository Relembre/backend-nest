import { ReadUserDto } from "src/controllers/dtos/read-user.dto";
import { UserModel } from "src/models/user.model";

export class UserMapper {
    static modelToDtoWithNoPass({ email, nome, id }: UserModel): ReadUserDto {
        return { email, nome, id }
    }
}