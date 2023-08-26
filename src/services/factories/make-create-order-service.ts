import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateOrderService } from "../create-order";
import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { PrismaItemsRepository } from "@/repositories/prisma/prisma-items-repository";

export function makeCreateOrderService() {
  const ordersRepository = new PrismaOrdersRepository();
  const itemsRepository = new PrismaItemsRepository();
  const usersRepository = new PrismaUsersRepository();
  const service = new CreateOrderService(
    ordersRepository,
    itemsRepository,
    usersRepository
  );

  return service;
}
