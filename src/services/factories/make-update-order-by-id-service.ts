import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { PrismaItemsRepository } from "@/repositories/prisma/prisma-items-repository";
import { UpdateOrderByIdService } from "../update-order-by-id";

export function makeUpdateOrderByIdService() {
  const ordersRepository = new PrismaOrdersRepository();
  const itemsRepository = new PrismaItemsRepository();
  const service = new UpdateOrderByIdService(ordersRepository, itemsRepository);

  return service;
}
