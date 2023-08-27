import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetOrderByIdService } from "@/services/factories/make-get-order-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getOrderById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Cria um schema de autenticação para receber os dados corretamente
  const getOrderRouteSchema = z.object({
    id: z.string(),
  });

  // Valida se os dados recebidos seguem o schema de validação
  const { id } = getOrderRouteSchema.parse(request.params);

  // Pega o id do usuário logado
  const { sub } = request.user;

  // Chama o serviço de buscar por um pedido pelo id
  const getOrderByIdService = makeGetOrderByIdService();

  try {
    // Executa o serviço de buscar por um pedido pelo id
    const { order, orderItems } = await getOrderByIdService.execute({
      id,
      userId: sub,
    });

    return reply.status(200).send({
      order,
      items: orderItems,
    });
  } catch (error) {
    // Retorna um erro especifico para dado não encontrado
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send();
    }

    throw error;
  }
}
