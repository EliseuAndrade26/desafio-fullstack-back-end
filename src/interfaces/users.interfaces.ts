import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  allUsersSchema,
  requestUsersSchema,
  updateUsersSchema,
  usersSchema,
  returnUsersSchema,
} from "../schemas/users.schemas";

export type iCreateUsers = z.infer<typeof requestUsersSchema>;
export type iUsers = z.infer<typeof usersSchema>;
type iUpdateUsersSchema = z.infer<typeof updateUsersSchema>;
export type iUpdateUsers = DeepPartial<iUpdateUsersSchema>;
export type iAllUsers = z.infer<typeof allUsersSchema>;
export type iReturnUsers = z.infer<typeof returnUsersSchema>;
