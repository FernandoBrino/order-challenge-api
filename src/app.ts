import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";
import { ordersRoutes } from "./http/controllers/orders/routes";
import { ZodError } from "zod";

export const app = fastify();

// Registra o plugin do fastify, passando a data de expiração do token e o secret para encriptar
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
});

app.register(usersRoutes);
app.register(ordersRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
