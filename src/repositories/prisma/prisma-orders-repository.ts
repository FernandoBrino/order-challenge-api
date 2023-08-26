import { Prisma } from "@prisma/client";
import { OrdersRepository } from "../orders-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrdersRepository implements OrdersRepository {
  async create(data: Prisma.OrderUncheckedCreateInput) {
    const order = await prisma.order.create({
      data,
    });

    return order;
  }

  async delete(id: string): Promise<void | null> {}

  async findById(id: string) {
    const order = await prisma.order.findUnique({
      where: {
        orderId: id,
      },
    });

    return order;
  }

  async findMany() {
    const orders = await prisma.order.findMany();

    return orders;
  }

  async update(id: string, data: { value: number }) {
    const order = await prisma.order.update({
      where: {
        orderId: id,
      },
      data,
    });

    return order;
  }
}
