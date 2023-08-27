import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { GetOrderByIdService } from "../get-order-by-id";
import { PrismaItemsRepository } from "@/repositories/prisma/prisma-items-repository";

export function makeGetOrderByIdService() {
  const ordersRepository = new PrismaOrdersRepository();
  const itemsRepository = new PrismaItemsRepository();
  const service = new GetOrderByIdService(ordersRepository, itemsRepository);

  return service;
}
