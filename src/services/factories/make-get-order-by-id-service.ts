import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { GetOrderByIdService } from "../get-order-by-id";

export function makeGetOrderByIdService() {
  const ordersRepository = new PrismaOrdersRepository();
  const service = new GetOrderByIdService(ordersRepository);

  return service;
}
