import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/sessions", authenticate);
  app.post("/users", create);
}
