import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import {
  iContacts,
  iCreateContacts,
} from "../../interfaces/contacts.interfaces";
import { contactsSchema } from "../../schemas/contacts.schemas";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppErrors";

const createContactsServices = async (
  contactData: iCreateContacts,
  id: string
): Promise<iContacts> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const contact: Contact = contactRepository.create({
    ...contactData,
    user: user,
  });

  await contactRepository.save(contact);

  const contactReturn: iContacts = {
    ...contact,
    user: user.id,
  };

  return contactsSchema.parse(contactReturn);
};

export { createContactsServices };
