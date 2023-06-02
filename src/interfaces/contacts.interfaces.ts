import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  allContactsSchema,
  requestContactsSchema,
  contactsSchema,
} from "../schemas/contacts.schemas";

export type iCreateContacts = z.infer<typeof requestContactsSchema>;
export type iContacts = z.infer<typeof contactsSchema>;
export type iUpdateContacts = DeepPartial<iCreateContacts>;
export type iAllContacts = z.infer<typeof allContactsSchema>;
