import * as express from "express";
import { Contact } from "../../entities/contacts.entity";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
      };
    }
  }
}
