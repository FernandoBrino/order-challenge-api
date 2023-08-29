import { UpdateItemFormatted } from "@/@types/update-item";
import { Item, Prisma } from "@prisma/client";

// Uma abstração dos métodos necessário no repositório de Orders
export interface ItemsRepository {
  create(data: Prisma.ItemUncheckedCreateInput[]): Promise<Prisma.BatchPayload>;
  updateMany(id: string, data: UpdateItemFormatted[]): Promise<Item[]>;
  getItemsByOrderId(id: string): Promise<Item[]>;
}
