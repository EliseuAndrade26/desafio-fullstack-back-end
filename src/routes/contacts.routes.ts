import { Router } from "express";
import {
  createContactsController,
  deleteContactController,
  retrieveAllContactsController,
  retrieveContactsController,
  updateContactsController,
} from "../controllers/contacts.controllers";
import { ensureDataIsValidMiddlewares } from "../middlewares/ensureDataIsValid.middlewares";
import {
  requestContactsSchema,
  updateContactsSchema,
} from "../schemas/contacts.schemas";
import ensureTokenIsValidMiddlewares from "../middlewares/ensureTokenIsValid.middlewares";
import ensureAddContactIsPossibleMiddlewares from "../middlewares/ensureAddContactIsPossible.middlewares";
import ensureContactExistsMiddlewares from "../middlewares/ensureContactExists.middlewares";
import ensureIsUserOwnerInContactMiddlewares from "../middlewares/ensureIsUserOwnerInContact.middlewares";
import ensureContactIsNotDeletedMiddlewares from "../middlewares/ensureContactIsNotDeleted.middlewares";
import ensureUsersIsNotDeletedMiddlewares from "../middlewares/ensureUserIsNotDeteled.middlewares";

export const contactsRoutes: Router = Router();

contactsRoutes.post(
  "",
  ensureTokenIsValidMiddlewares,
  ensureUsersIsNotDeletedMiddlewares,
  ensureDataIsValidMiddlewares(requestContactsSchema),
  ensureAddContactIsPossibleMiddlewares,
  createContactsController
);

contactsRoutes.get(
  "/:id",
  ensureTokenIsValidMiddlewares,
  ensureContactExistsMiddlewares,
  ensureUsersIsNotDeletedMiddlewares,
  ensureContactIsNotDeletedMiddlewares,
  ensureIsUserOwnerInContactMiddlewares,
  retrieveContactsController
);

contactsRoutes.get(
  "",
  ensureTokenIsValidMiddlewares,
  ensureUsersIsNotDeletedMiddlewares,
  retrieveAllContactsController
);

contactsRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddlewares,
  ensureContactExistsMiddlewares,
  ensureContactIsNotDeletedMiddlewares,
  ensureUsersIsNotDeletedMiddlewares,
  ensureDataIsValidMiddlewares(updateContactsSchema),
  ensureIsUserOwnerInContactMiddlewares,
  updateContactsController
);

contactsRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddlewares,
  ensureContactExistsMiddlewares,
  ensureUsersIsNotDeletedMiddlewares,
  ensureContactIsNotDeletedMiddlewares,
  ensureIsUserOwnerInContactMiddlewares,
  deleteContactController
);
