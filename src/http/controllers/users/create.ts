import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeCreateUserService } from "@/services/factories/make-create-user-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  // Cria um schema de autenticação para receber os dados corretamente
  const createUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  // Valida se os dados recebidos seguem o schema de validação
  const { email, password } = createUserBodySchema.parse(request.body);

  try {
    // Chama o serviço de criar usuário
    const createUserService = makeCreateUserService();

    // Executa o serviço de criar usuário
    await createUserService.execute({
      email,
      password,
    });

    return reply.status(201).send();
  } catch (error) {
    // Retorna um erro especifico para usuário já existente
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }
}
