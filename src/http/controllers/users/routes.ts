import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { authenticateSchema } from "./swagger/authenticate-schema";
import { createUserSchema } from "./swagger/create-schema";

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    "/sessions",
    {
      schema: authenticateSchema,
    },
    authenticate
  );
  app.post(
    "/users",
    {
      schema: createUserSchema,
    },
    create
  );
}
