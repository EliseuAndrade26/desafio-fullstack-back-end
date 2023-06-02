import { z } from "zod";

export const contactsSchema = z.object({
  id: z.string(),
  fullName: z.string().max(150),
  email: z.string().email().max(128),
  foneNumber: z.string().max(11),
  user: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

export const requestContactsSchema = contactsSchema.omit({
  id: true,
  user: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const updateContactsSchema = requestContactsSchema.partial();

export const allSchema = contactsSchema.omit({ user: true });

export const allContactsSchema = allSchema.array();
