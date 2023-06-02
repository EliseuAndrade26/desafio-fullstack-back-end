import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  allUsersSchema,
  requestUsersSchema,
  usersSchema,
  returnUsersSchema,
} from "../schemas/users.schemas";

export type iCreateUsers = z.infer<typeof requestUsersSchema>;
export type iUsers = z.infer<typeof usersSchema>;
export type iUpdateUsers = DeepPartial<iCreateUsers>;
export type iAllUsers = z.infer<typeof allUsersSchema>;
export type iReturnUsers = z.infer<typeof returnUsersSchema>;
