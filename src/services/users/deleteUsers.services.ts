import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { AppDataSource } from "../../data-source";

const deleteUserService = async (idUser: string): Promise<void> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await usersRepository.findOneBy({ id: idUser });

  await usersRepository.softRemove(user!);
};

export { deleteUserService };
