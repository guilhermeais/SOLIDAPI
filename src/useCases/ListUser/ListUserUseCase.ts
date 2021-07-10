import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersReopnsitory";



export class ListUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}
  async findByEmail(email: string) {
    const user: User = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new Error("User don't exists!")
    }
    return user
  }

  async findAll() {
    const users: User[] = await this.usersRepository.findAll()
    if (!users) {
      throw new Error("Can't find any user!")
    }
    return users
  }
}
