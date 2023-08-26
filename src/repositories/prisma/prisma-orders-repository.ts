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

  async delete(id: string, userId: string): Promise<void | null> {
    await prisma.order.delete({
      where: {
        orderId: id,
        userId,
      },
    });
  }

  async findById(id: string, userId: string) {
    const order = await prisma.order.findUnique({
      where: {
        orderId: id,
        userId,
      },
    });

    return order;
  }

  async findMany(userId: string) {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
    });

    return orders;
  }

  async update(id: string, userId: string, data: { value: number }) {
    const order = await prisma.order.update({
      where: {
        orderId: id,
        userId,
      },
      data,
    });

    return order;
  }
}
