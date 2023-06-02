import { Repository } from "typeorm";
import { Contact } from "../../entities/contacts.entity";
import { AppDataSource } from "../../data-source";

const deleteContactService = async (contactId: string): Promise<void> => {
  const ContactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact: Contact | null = await ContactsRepository.findOneBy({
    id: contactId,
  });

  await ContactsRepository.softRemove(contact!);
};

export { deleteContactService };
