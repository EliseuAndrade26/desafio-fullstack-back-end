import { Request, Response } from "express";
import {
  iCreateUsers,
  iReturnUsers,
  iUpdateUsers,
} from "../interfaces/users.interfaces";
import { createUsersServices } from "../services/users/createUsers.services";
import { retrieveUsersServices } from "../services/users/RetrieveUsers.services";
import { updateUsersServices } from "../services/users/updateUsers.services";
import { deleteUserService } from "../services/users/deleteUsers.services";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: iCreateUsers = req.body;

  const newUser: iReturnUsers = await createUsersServices(userData);

  return res.status(201).json(newUser);
};

const retrieveUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idUser: string = req.user.id;

  const user: iReturnUsers = await retrieveUsersServices(idUser);

  return res.json(user);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUserData: iUpdateUsers = req.body;

  const idUser: string = req.user.id;

  const userData: iReturnUsers = await updateUsersServices(newUserData, idUser);

  return res.json(userData);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idUser: string = req.user.id;

  await deleteUserService(idUser);

  return res.status(204).send();
};

export {
  createUserController,
  retrieveUsersController,
  updateUsersController,
  deleteUserController,
};
