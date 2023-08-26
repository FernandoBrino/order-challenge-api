import { Order, Prisma } from "@prisma/client";
import { OrdersRepository } from "../orders-repository";
import { randomUUID } from "crypto";

// In memory repository é um design pattern, utilizado para simular um banco de dados
// quando o uso do mesmo não é necessário ou viável, em operações de CRUD por exemplo nos testes unitários.

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async create(data: Prisma.OrderCreateInput) {
    const order = {
      orderId: data.orderId ?? randomUUID(),
      value: data.value,
      creationDate: data.creationDate
        ? new Date(data.creationDate)
        : new Date(),
    };

    this.items.push(order);

    return order;
  }

  async findMany() {
    return this.items;
  }

  async findById(id: string) {
    const order = this.items.find((order) => order.orderId === id);

    if (!order) {
      return null;
    }

    return order;
  }
}
