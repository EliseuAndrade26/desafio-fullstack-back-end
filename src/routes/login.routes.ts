import { Router } from "express";
import { createLoginControllers } from "../controllers/login.controller";
import { ensureDataIsValidMiddlewares } from "../middlewares/ensureDataIsValid.middlewares";
import { createLoginSchema } from "../schemas/login.schemas";

export const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddlewares(createLoginSchema),
  createLoginControllers
);
