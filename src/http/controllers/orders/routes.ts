import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJwt } from "@/http/middlewares/jwt-verify";
import { getOrderById } from "./get-order-by-id";
import { fetchAllOrders } from "./fetch-all";
import { deleteById } from "./delete";
import { update } from "./update";
import { createOrderSchema } from "./swagger/create-order-schema";
import { createOrderByIdSchema } from "./swagger/get-order-by-id-schema";
import { deleteOrderSchema } from "./swagger/delete-order-schema";
import { updateOrderByIdSchema } from "./swagger/update-order-schema";
import { fetchAllOrdersSchema } from "./swagger/fetch-all-orders-schema";

export async function ordersRoutes(app: FastifyInstance) {
  app.get(
    "/order/:id",
    {
      onRequest: [verifyJwt],
      schema: createOrderByIdSchema,
    },
    getOrderById
  );
  app.get(
    "/order/list",
    { onRequest: [verifyJwt], schema: fetchAllOrdersSchema },
    fetchAllOrders
  );
  app.post(
    "/order",
    {
      onRequest: [verifyJwt],
      schema: createOrderSchema,
    },
    create
  );
  app.put(
    "/order/:id",
    { onRequest: [verifyJwt], schema: updateOrderByIdSchema },
    update
  );
  app.delete(
    "/order/:id",
    { onRequest: [verifyJwt], schema: deleteOrderSchema },
    deleteById
  );
}
