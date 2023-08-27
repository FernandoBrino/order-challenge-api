import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeFetchAllOrdersService } from "@/services/factories/make-fetch-all-orders-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function fetchAllOrders(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub } = request.user;

  const fetchAllOrdersService = makeFetchAllOrdersService();

  try {
    const { orders } = await fetchAllOrdersService.execute({
      userId: sub,
    });

    return reply.status(200).send({ orders });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send();
    }

    throw error;
  }
}
