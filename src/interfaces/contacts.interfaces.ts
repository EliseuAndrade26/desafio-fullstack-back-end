import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  allContactsSchema,
  requestContactsSchema,
  updateContactsSchema,
  contactsSchema,
} from "../schemas/contacts.schemas";

export type iCreatecontacts = z.infer<typeof requestContactsSchema>;
export type icontacts = z.infer<typeof contactsSchema>;
type iUpdatecontactsSchema = z.infer<typeof updateContactsSchema>;
export type iUpdatecontacts = DeepPartial<iUpdatecontactsSchema>;
export type iAllcontacts = z.infer<typeof allContactsSchema>;
