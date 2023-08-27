import { makeCreateOrderService } from "@/services/factories/make-create-order-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrderBodySchema = z.object({
    numeroPedido: z.string(),
    valorTotal: z.number(),
    dataCriacao: z.string(),
    items: z
      .object({
        idItem: z.string(),
        quantidadeItem: z.number(),
        valorItem: z.number(),
      })
      .array(),
  });

  const { numeroPedido, valorTotal, dataCriacao, items } =
    createOrderBodySchema.parse(request.body);

  const { sub } = request.user;

  const createOrderService = makeCreateOrderService();

  await createOrderService.execute({
    userId: sub,
    numeroPedido,
    valorTotal,
    dataCriacao,
    items,
  });

  return reply.status(201).send();
}
