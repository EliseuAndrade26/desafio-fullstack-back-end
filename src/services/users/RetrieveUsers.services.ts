import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { iReturnUsers } from "../../interfaces/users.interfaces";
import { returnUsersSchema } from "../../schemas/users.schemas";

export const retrieveUsersServices = async (
  idUser: string
): Promise<iReturnUsers> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser: User | null = await usersRepository.findOne({
    where: {
      id: idUser,
    },
    relations: {
      contacts: true,
    },
  });

  return returnUsersSchema.parse(findUser);
};
