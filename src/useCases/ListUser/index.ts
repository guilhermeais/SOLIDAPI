import { MySqlUsersRepository } from "../../repositories/implementations/MySqlUsersRepository";
import { ListUserController } from "./ListUserController";
import { ListUserUseCase } from "./ListUserUseCase";


const mysqlUsersRepository = new MySqlUsersRepository()
const listUserUseCase = new ListUserUseCase(
    mysqlUsersRepository
)

const listUserController = new ListUserController(
    listUserUseCase
)

export {listUserUseCase, listUserController}