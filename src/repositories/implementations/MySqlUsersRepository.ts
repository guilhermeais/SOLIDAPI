import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersReopnsitory";
import {user} from "../../database/server"

export class MySqlUsersRepository implements IUsersRepository {
  private users: User[] = user;
  async findAll(): Promise<User[]> {
    console.log('asfsadfsdf',this.users)
    return this.users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
    console.log(this.users)
  }
}
