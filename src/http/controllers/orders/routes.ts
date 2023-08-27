import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJwt } from "@/http/middlewares/jwt-verify";
import { getOrderById } from "./get-order-by-id";
import { fetchAllOrders } from "./fetch-all";

export async function ordersRoutes(app: FastifyInstance) {
  app.get("/order/:id", { onRequest: [verifyJwt] }, getOrderById);
  app.get("/order/list", { onRequest: [verifyJwt] }, fetchAllOrders);
  app.post("/order", { onRequest: [verifyJwt] }, create);
}
