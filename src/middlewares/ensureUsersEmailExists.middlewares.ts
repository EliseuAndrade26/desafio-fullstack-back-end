import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppErrors";

export default async function ensureUsersEmailOrFoneExistsMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUserByEmail: User | null = await userRepository.findOneBy({
    email: req.body.email,
  });

  const findUserByFone: User | null = await userRepository.findOneBy({
    foneNumber: req.body.foneNumber,
  });

  if (findUserByEmail && findUserByFone) {
    throw new AppError("Email and Fone Number already exists", 409);
  } else if (findUserByEmail) {
    throw new AppError("Email already exists", 409);
  } else if (findUserByFone) {
    throw new AppError("Fone Number already exists", 409);
  }

  return next();
}
