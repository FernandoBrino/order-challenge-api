import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Cria um schema de autenticação para receber os dados corretamente
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  // Valida se os dados recebidos seguem o schema de validação
  const { email, password } = authenticateBodySchema.parse(request.body);

  // Chama o serviço de autenticação
  const authenticateService = makeAuthenticateService();

  try {
    // Executa o serviço de autenticação
    const { user } = await authenticateService.execute({ email, password });

    // Cria o token de validação
    const token = await reply.jwtSign({
      sub: user.id,
    });

    return reply.status(200).send({ token });
  } catch (error) {
    // Retorna um erro especifico para credenciais invalidas
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
}
