import { makeCreateOrderService } from "@/services/factories/make-create-order-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  // Cria um schema de autenticação para receber os dados corretamente
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

  // Valida se os dados recebidos seguem o schema de validação
  const { numeroPedido, valorTotal, dataCriacao, items } =
    createOrderBodySchema.parse(request.body);

  // Pega o id do usuário logado
  const { sub } = request.user;

  // Chama o serviço de criar pedidos
  const createOrderService = makeCreateOrderService();

  // Executa o serviço de criar pedidos
  await createOrderService.execute({
    userId: sub,
    numeroPedido,
    valorTotal,
    dataCriacao,
    items,
  });

  return reply.status(201).send();
}
