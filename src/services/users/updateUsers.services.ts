import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { iUpdateUsers } from "../../interfaces/users.interfaces";
import { returnUsersSchema } from "../../schemas/users.schemas";

export const updateUsersServices = async (
  newUserData: iUpdateUsers,
  idUser: string
) => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await usersRepository.findOneBy({
    id: idUser,
  });

  const user: User = usersRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await usersRepository.save(user);

  return returnUsersSchema.parse(user);
};
