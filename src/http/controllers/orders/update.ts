import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeUpdateOrderByIdService } from "@/services/factories/make-update-order-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  // Cria um schema de autenticação para receber os dados corretamente
  const updateOrderRouteSchema = z.object({
    id: z.string(),
  });

  // Cria um schema de autenticação para receber os dados corretamente
  const updateOrderBodySchema = z.object({
    valorTotal: z.number(),
    items: z
      .object({
        idItem: z.string(),
        quantidadeItem: z.number(),
        valorItem: z.number(),
      })
      .array(),
  });

  // Valida se os dados recebidos seguem o schema de validação
  const { id } = updateOrderRouteSchema.parse(request.params);

  // Valida se os dados recebidos seguem o schema de validação
  const { valorTotal, items } = updateOrderBodySchema.parse(request.body);

  // Pega o id do usuário logado
  const { sub } = request.user;

  // Chama o serviço de atualizar um pedido pelo id
  const updateOrderByIdService = makeUpdateOrderByIdService();

  try {
    // Executa o serviço de atualizar um pedido pelo id
    const { order, orderItems } = await updateOrderByIdService.execute({
      id,
      userId: sub,
      valorTotal,
      items,
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
