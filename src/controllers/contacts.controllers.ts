import { Request, Response } from "express";
import {
  iAllContacts,
  iContacts,
  iCreateContacts,
  iUpdateContacts,
} from "../interfaces/contacts.interfaces";
import { createContactsServices } from "../services/contacts/createContacts.services";
import { retrieveContactsServices } from "../services/contacts/RetrieveContacts.services";
import { updateContactsServices } from "../services/contacts/updateContacts.services";
import { deleteContactService } from "../services/contacts/deleteContacts.services";
import { RetrieveAllContacts } from "../services/contacts/RetrieveAllContacts.services";

const createContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactData: iCreateContacts = req.body;

  const userId: string = req.user.id;

  const newContact: iContacts = await createContactsServices(
    contactData,
    userId
  );

  return res.status(201).json(newContact);
};

const retrieveContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId: string = req.params.id;

  const contact: iContacts = await retrieveContactsServices(contactId);

  return res.json(contact);
};

const retrieveAllContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idUser: string = req.user.id;

  const contacts: iAllContacts = await RetrieveAllContacts(idUser);

  return res.json(contacts);
};

const updateContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newContactData: iUpdateContacts = req.body;

  const contactId: string = req.params.id;

  const contactData: iUpdateContacts = await updateContactsServices(
    newContactData,
    contactId
  );

  return res.json(contactData);
};

const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId: string = req.params.id;

  await deleteContactService(contactId);

  return res.status(204).send();
};

export {
  createContactsController,
  retrieveContactsController,
  retrieveAllContactsController,
  updateContactsController,
  deleteContactController,
};
