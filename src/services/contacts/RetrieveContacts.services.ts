import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { iContacts } from "../../interfaces/contacts.interfaces";
import { contactsSchema } from "../../schemas/contacts.schemas";

export const retrieveContactsServices = async (
  id: string
): Promise<iContacts> => {
  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const findContact: Contact | null = await contactsRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      user: true,
    },
  });

  const contactReturn: iContacts = {
    ...findContact!,
    user: findContact!.user.id,
  };

  return contactsSchema.parse(contactReturn);
};
