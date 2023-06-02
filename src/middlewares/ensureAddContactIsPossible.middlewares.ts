import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors/AppErrors";
import { Contact } from "../entities/contacts.entity";

export default async function ensureAddContactIsPossibleMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const findUser: User | null = await userRepository.findOneBy({
    id: req.user.id,
  });

  if (
    findUser!.email === req.body.email &&
    findUser!.foneNumber === req.body.foneNumber
  ) {
    throw new AppError("User can not add your own Email and Fone Number", 403);
  } else if (findUser!.email === req.body.email) {
    throw new AppError("User can not add your own Email", 403);
  } else if (findUser!.foneNumber === req.body.foneNumber) {
    throw new AppError("User can not add your own Fone Number", 403);
  }

  const findContactByEmail: Contact | null = await contactRepository.findOneBy({
    email: req.body.email,
  });

  const findContactByFoneNumber: Contact | null =
    await contactRepository.findOneBy({
      foneNumber: req.body.foneNumber,
    });

  if (findContactByEmail) {
    throw new AppError(
      "Email and Fone Number alredy add in your contacts",
      403
    );
  } else if (findContactByEmail) {
    throw new AppError("Email alredy add in your contacts", 403);
  } else if (findContactByFoneNumber) {
    throw new AppError("Fone Number alredy add in your contacts", 403);
  }

  return next();
}
