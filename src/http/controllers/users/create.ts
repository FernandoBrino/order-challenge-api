import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeCreateUserService } from "@/services/factories/make-create-user-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = createUserBodySchema.parse(request.body);

  try {
    const createUserService = makeCreateUserService();
    await createUserService.execute({
      email,
      password,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }
}
