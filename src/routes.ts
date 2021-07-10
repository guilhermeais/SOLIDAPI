import { Router } from "express";
import { createUserController } from "./useCases/createUser";
import { listUserController } from "./useCases/ListUser";

const router = Router();

router.get("/users", (request, response) => {
  return listUserController.handle(request, response);
});

router.post("/users", (request, response) => {
  return createUserController.handle(request, response);
});

export { router };
