import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { DeleteOrderService } from "../delete-order";

export function makeDeleteOrderService() {
  const ordersRepository = new PrismaOrdersRepository();
  const service = new DeleteOrderService(ordersRepository);

  return service;
}
