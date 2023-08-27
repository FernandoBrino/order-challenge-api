import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { SwaggerTheme } from "swagger-themes";

import { env } from "./env";
import { usersRoutes } from "./http/controllers/users/routes";
import { ordersRoutes } from "./http/controllers/orders/routes";

// Inicia o fastify
export const app = fastify();

// Registra o plugin do fastify, passando a data de expiração do token e o secret para encriptar
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
});

// Registra o plugin do swagger
(async () => {
  // Registra informações sobre a api
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Order Management Api",
        description:
          "Uma api para gerenciamento de pedidos proposto pela empresa Jitterbit",
        version: "0.1.0",
      },
      securityDefinitions: {
        BearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: "Bearer token",
        },
      },
    },
  });

  // Registra uma rota para a interface do swagger-ui
  await app.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
})();

// Registar as rotas do usuário
app.register(usersRoutes);

// Registar as rotas dos pedidos
app.register(ordersRoutes);

// Configurar um 'error handler' global.
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
