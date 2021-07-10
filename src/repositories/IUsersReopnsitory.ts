import { User } from "../entities/User";

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
