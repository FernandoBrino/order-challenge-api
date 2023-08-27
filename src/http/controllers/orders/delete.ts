import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeDeleteOrderService } from "@/services/factories/make-delete-order-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {
  // Cria um schema de autenticação para receber os dados corretamente
  const deleteOrderRouteSchema = z.object({
    id: z.string(),
  });

  // Valida se os dados recebidos seguem o schema de validação
  const { id } = deleteOrderRouteSchema.parse(request.params);

  // Chama o serviço de deletar pedido
  const deleteOrderService = makeDeleteOrderService();

  // Pega o id do usuário logado
  const { sub } = request.user;

  try {
    // Executa o serviço de deletar pedidos
    await deleteOrderService.execute({ id, userId: sub });

    return reply.status(204).send();
  } catch (error) {
    // Retorna um erro especifico para dado não encontrado
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send();
    }

    throw error;
  }
}
