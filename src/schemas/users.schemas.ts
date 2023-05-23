import { z } from "zod";
import { requestContactsSchema } from "./contacts.schemas";

export const usersSchema = z.object({
  id: z.number(),
  fullname: z.string().max(150),
  email: z.string().email().max(128),
  password: z.string().max(128),
  foneNumber: z.string().max(11),
  conatcts: requestContactsSchema.nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

export const requestUsersSchema = usersSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const updateUsersSchema = requestUsersSchema.partial();

export const returnUsersSchema = usersSchema.omit({
  password: true,
});

export const allUsersSchema = returnUsersSchema.array();
