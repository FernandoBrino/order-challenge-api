import { makeFetchAllOrdersService } from "@/services/factories/make-fetch-all-orders-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchAllOrders(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub } = request.user;

  const fetchAllOrdersService = makeFetchAllOrdersService();

  const { orders } = await fetchAllOrdersService.execute({
    userId: sub,
  });

  return reply.status(200).send({ orders });
}
