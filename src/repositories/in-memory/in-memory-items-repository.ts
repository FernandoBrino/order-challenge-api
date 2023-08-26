import { Item, Prisma } from "@prisma/client";
import { ItemsRepository } from "../items-repository";
import { randomUUID } from "crypto";

// In memory repository é um design pattern, utilizado para simular um banco de dados
// quando o uso do mesmo não é necessário ou viável, em operações de CRUD por exemplo nos testes unitários.

export class InMemoryItemsRepository implements ItemsRepository {
  public items: Item[] = [];

  async create(data: Prisma.ItemUncheckedCreateInput[]) {
    for (let item of data) {
      this.items.push({
        productId: item.productId ?? randomUUID(),
        orderId: item.orderId,
        price: item.price,
        quantity: item.quantity,
      });
    }

    return this.items;
  }
}
