import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { iCreateUsers, iReturnUsers } from "../../interfaces/users.interfaces";
import { returnUsersSchema } from "../../schemas/users.schemas";
import { AppError } from "../../errors/AppErrors";

export const createUsersServices = async (
  userData: iCreateUsers
): Promise<iReturnUsers> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUserEmail: User | null = await usersRepository.findOne({
    where: {
      email: userData.email,
    },
    withDeleted: true,
  });

  const findUserFoneNumber: User | null = await usersRepository.findOne({
    where: {
      foneNumber: userData.foneNumber,
    },
    withDeleted: true,
  });

  if (findUserEmail || findUserFoneNumber) {
    throw new AppError("User cant be created", 403);
  }

  const user: User = usersRepository.create(userData);

  await usersRepository.save(user);

  return returnUsersSchema.parse(user);
};
