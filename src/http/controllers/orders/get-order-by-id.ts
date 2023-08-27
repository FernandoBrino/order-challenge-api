import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetOrderByIdService } from "@/services/factories/make-get-order-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getOrderById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getOrderRouteSchema = z.object({
    id: z.string(),
  });

  const { id } = getOrderRouteSchema.parse(request.params);

  const getOrderByIdService = makeGetOrderByIdService();

  const { sub } = request.user;

  try {
    const { order } = await getOrderByIdService.execute({ id, userId: sub });

    return reply.status(200).send({
      order,
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send();
    }

    throw error;
  }
}
