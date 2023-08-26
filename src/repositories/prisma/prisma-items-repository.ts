import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ItemsRepository } from "../items-repository";

export class PrismaItemsRepository implements ItemsRepository {
  async create(data: Prisma.ItemUncheckedCreateInput[]) {
    const items = await prisma.$transaction(
      data.map((item) => prisma.item.create({ data: item }))
    );

    return items;
  }

  async updateMany(
    id: string,
    data: {
      productId: string;
      quantity?: number | undefined;
      price?: number | undefined;
    }[]
  ) {
    const items = await prisma.$transaction(
      data.map((item) =>
        prisma.item.update({
          where: {
            orderId: id,
            productId: item.productId,
          },
          data: {
            quantity: item.quantity,
            price: item.price,
          },
        })
      )
    );

    return items;
  }
}