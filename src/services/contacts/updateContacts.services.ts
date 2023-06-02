import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import {
  iContacts,
  iCreateContacts,
  iUpdateContacts,
} from "../../interfaces/contacts.interfaces";
import { contactsSchema } from "../../schemas/contacts.schemas";

export const updateContactsServices = async (
  newContactData: iUpdateContacts,
  contactId: string
): Promise<iCreateContacts> => {
  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const oldContatcData: Contact | null = await contactsRepository.findOne({
    where: {
      id: contactId,
    },
    relations: {
      user: true,
    },
  });

  const contact: Contact = contactsRepository.create({
    ...oldContatcData,
    ...newContactData,
  });

  await contactsRepository.save(contact);

  const contactReturn: iContacts = {
    ...contact,
    user: oldContatcData!.user.id,
  };

  return contactsSchema.parse(contactReturn);
};
