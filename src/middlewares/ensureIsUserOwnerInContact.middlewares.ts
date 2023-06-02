import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppErrors";
import { Contact } from "../entities/contacts.entity";

export default async function ensureIsUserOwnerInContactMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const findContact: Contact | null = await contactRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: {
      user: true,
    },
  });

  if (findContact!.user.id != req.user.id) {
    throw new AppError("User not have this permission", 403);
  }

  return next();
}
