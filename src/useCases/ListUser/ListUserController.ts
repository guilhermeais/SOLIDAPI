import { Request, Response } from "express";
import { ListUserUseCase } from "./ListUserUseCase";

export class ListUserController {
  constructor(private ListUserUseCase: ListUserUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const email = request.query.email ? request.query.email.toString() : "";

    if (email) {
      try {
        const user = await this.ListUserUseCase.findByEmail(email);
        return response.status(201).send(user);
      } catch (error) {
        return response.status(400).json({
          message: error.message || "Unexpected error",
        });
      }
    } else {
      const users = await this.ListUserUseCase.findAll();
      return response.status(201).send(users);
    }
  }
}
