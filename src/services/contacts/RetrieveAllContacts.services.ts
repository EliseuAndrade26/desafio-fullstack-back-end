import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { iAllContacts } from "../../interfaces/contacts.interfaces";
import { allContactsSchema } from "../../schemas/contacts.schemas";

export const RetrieveAllContacts = async (
  idUser: string
): Promise<iAllContacts> => {
  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const findContacts: Contact[] = await contactsRepository.find({
    relations: {
      user: true,
    },
    where: {
      user: {
        id: idUser,
      },
    },
    withDeleted: true,
  });

  // const userContacts = findContacts.forEach((elem) => {
  //   if (elem.user.id === idUser) {
  //     return elem;
  //   }
  // });

  return allContactsSchema.parse(findContacts);
};
