import "@fastify/jwt";

// Sobrescreve o tipo dos dados armazenados no token jwt
declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      sub: string;
    };
  }
}
