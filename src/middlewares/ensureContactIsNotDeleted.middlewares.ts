import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contacts.entity";
import { AppError } from "../errors/AppErrors";

export default async function ensureContactIsNotDeletedMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const findContact: Contact | null = await contactRepository.findOneBy({
    id: req.params.id,
  });

  if (findContact?.deletedAt) {
    throw new AppError("Contact not found", 404);
  }

  return next();
}
