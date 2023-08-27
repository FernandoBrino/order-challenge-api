import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeFetchAllOrdersService } from "@/services/factories/make-fetch-all-orders-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchAllOrders(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Pega o id do usuário logado
  const { sub } = request.user;

  // Chama o serviço de buscar todos pedidos
  const fetchAllOrdersService = makeFetchAllOrdersService();

  try {
    // Executa o serviço de buscar todos pedidos
    const { orders } = await fetchAllOrdersService.execute({
      userId: sub,
    });

    return reply.status(200).send({ orders });
  } catch (error) {
    // Retorna um erro especifico para dado não encontrado
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send();
    }

    throw error;
  }
}
