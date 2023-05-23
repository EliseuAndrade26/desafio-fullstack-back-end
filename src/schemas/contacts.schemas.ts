import { z } from "zod";

export const contactsSchema = z.object({
  id: z.number(),
  fullname: z.string().max(150),
  email: z.string().email().max(128),
  foneNumber: z.string().max(11),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

export const requestContactsSchema = contactsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const updateContactsSchema = requestContactsSchema.partial();

export const allContactsSchema = contactsSchema.array();
