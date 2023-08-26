import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

// Registra o plugin do fastify, passando a data de expiração do token e o secret para encriptar
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
});

app.register(usersRoutes);
