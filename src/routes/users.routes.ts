import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  retrieveUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import { ensureDataIsValidMiddlewares } from "../middlewares/ensureDataIsValid.middlewares";
import {
  requestUsersSchema,
  updateUsersSchema,
} from "../schemas/users.schemas";
import ensureUsersEmailExistsMiddlewares from "../middlewares/ensureUsersEmailExists.middlewares";
import ensureTokenIsValidMiddlewares from "../middlewares/ensureTokenIsValid.middlewares";
import ensureUsersIsNotDeletedMiddlewares from "../middlewares/ensureUserIsNotDeteled.middlewares";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureUsersEmailExistsMiddlewares,
  ensureDataIsValidMiddlewares(requestUsersSchema),
  createUserController
);

usersRoutes.get(
  "",
  ensureTokenIsValidMiddlewares,
  ensureUsersIsNotDeletedMiddlewares,
  retrieveUsersController
);

usersRoutes.patch(
  "",
  ensureTokenIsValidMiddlewares,
  ensureUsersIsNotDeletedMiddlewares,
  ensureDataIsValidMiddlewares(updateUsersSchema),
  updateUsersController
);

usersRoutes.delete(
  "",
  ensureTokenIsValidMiddlewares,
  ensureUsersIsNotDeletedMiddlewares,
  deleteUserController
);
