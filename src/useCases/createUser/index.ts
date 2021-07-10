import { MailtrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { MySqlUsersRepository } from "../../repositories/implementations/MySqlUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider()
const mysqlUsersRepository = new MySqlUsersRepository()
const createUserUseCase = new CreateUserUseCase(
    mysqlUsersRepository, mailtrapMailProvider
)

const createUserController = new CreateUserController(
    createUserUseCase
)

export {createUserUseCase, createUserController}