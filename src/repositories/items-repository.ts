import { Item, Prisma } from "@prisma/client";

// Uma abstração dos métodos necessário no repositório de Orders
export interface ItemsRepository {
  create(data: Prisma.ItemUncheckedCreateInput[]): Promise<Item[]>;
  updateMany(
    id: string,
    data: {
      productId: string;
      quantity?: number;
      price?: number;
    }[]
  ): Promise<Item[]>;
}
