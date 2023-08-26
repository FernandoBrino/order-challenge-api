import { Order, Prisma } from "@prisma/client";
import { OrdersRepository } from "../orders-repository";
import { randomUUID } from "crypto";

// In memory repository é um design pattern, utilizado para simular um banco de dados
// quando o uso do mesmo não é necessário ou viável, em operações de CRUD por exemplo nos testes unitários.

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async create(data: Prisma.OrderUncheckedCreateInput) {
    // Cria um novo pedido
    const order = {
      userId: data.userId,
      orderId: data.orderId ?? randomUUID(),
      value: data.value,
      creationDate: data.creationDate
        ? new Date(data.creationDate)
        : new Date(),
    };

    this.items.push(order);

    return order;
  }

  // Busca todos pedidos
  async findMany(userId: string) {
    const items = this.items.filter((order) => order.userId === userId);

    if (!items) {
      return null;
    }

    return items;
  }

  // Busca um pedido pelo id
  async findById(id: string, userId: string) {
    const order = this.items.find(
      (order) => order.orderId === id && order.userId === userId
    );

    if (!order) {
      return null;
    }

    return order;
  }

  // Atualiza um pedido
  async update(
    id: string,
    userId: string,
    data: {
      value: number;
    }
  ) {
    const order = this.items.find(
      (order) => order.orderId === id && order.userId === userId
    );
    const orderIndex = this.items.findIndex(
      (order) => order.orderId === id && order.userId === userId
    );

    if (!order) {
      return null;
    }

    const updatedOrder = {
      ...order,
      ...data,
    };

    this.items[orderIndex] = updatedOrder;

    const savedOrder = this.items[orderIndex];

    return savedOrder;
  }

  // Deleta um pedido
  async delete(id: string, userId: string) {
    // Se não houver um item com o id do pedido retorna -1
    const order = this.items.findIndex(
      (order) => order.orderId === id && order.userId === userId
    );

    // se for menor que 0 é por que o pedido não foi achado
    if (order < 0) {
      return null;
    }

    this.items.splice(order, 1);
  }
}
