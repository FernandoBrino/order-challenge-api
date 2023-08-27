import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { makeDeleteOrderService } from "@/services/factories/make-delete-order-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteById(request: FastifyRequest, reply: FastifyReply) {
  const deleteOrderRouteSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteOrderRouteSchema.parse(request.params);

  const deleteOrderService = makeDeleteOrderService();

  const { sub } = request.user;

  try {
    await deleteOrderService.execute({ id, userId: sub });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send();
    }

    throw error;
  }
}
