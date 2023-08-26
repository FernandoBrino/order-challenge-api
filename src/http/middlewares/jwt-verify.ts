import { FastifyReply, FastifyRequest } from "fastify";

// Verifica se o token está presentar e decodifica o mesmo
export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({
      message: "Unauthorized",
    });
  }
}
