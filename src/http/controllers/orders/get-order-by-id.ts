import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeGetOrderByIdService } from "@/services/factories/make-get-order-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getOrderById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getPetRouteSchema = z.object({
    id: z.string(),
  });

  const { id } = getPetRouteSchema.parse(request.params);

  const getOrderByIdService = makeGetOrderByIdService();

  const { sub } = request.user;

  console.log("id", id);
  console.log("sub", sub);

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
