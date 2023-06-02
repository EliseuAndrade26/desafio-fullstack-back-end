import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schemas";

export type iLogin = z.infer<typeof createLoginSchema>;
