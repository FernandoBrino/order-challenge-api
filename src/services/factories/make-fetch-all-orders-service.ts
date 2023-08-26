import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { FetchAllOrdersService } from "../fetch-all-orders";

export function makeFetchAllOrdersService() {
  const ordersRepository = new PrismaOrdersRepository();
  const service = new FetchAllOrdersService(ordersRepository);

  return service;
}
