import { Item, Prisma } from "@prisma/client";
import { ItemsRepository } from "../items-repository";
import { randomUUID } from "crypto";
import { UpdateItemFormatted } from "@/@types/update-item";

// In memory repository é um design pattern, utilizado para simular um banco de dados
// quando o uso do mesmo não é necessário ou viável, em operações de CRUD por exemplo nos testes unitários.

export class InMemoryItemsRepository implements ItemsRepository {
  public items: Item[] = [];

  // Cria novos itens
  async create(data: Prisma.ItemUncheckedCreateInput[]) {
    // Cria um item por vez
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

  // Atualiza itens de um pedido
  async updateMany(id: string, data: UpdateItemFormatted[]) {
    // Busca pelos items de um pedido
    let items = this.items.filter((item) => item.orderId === id);

    // Atualiza os itens do pedido
    items = items.filter((item) => {
      data.map((product) => {
        if (item.productId === product.productId) {
          item.quantity = product.quantity ?? item.quantity;
          item.price = product.price ?? item.price;
        }
      });
      return item;
    });

    return items;
  }

  async getItemsByOrderId(id: string) {
    const items = this.items.filter((item) => item.orderId === id);

    return items;
  }
}
