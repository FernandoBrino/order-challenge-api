import { Order, Prisma } from "@prisma/client";

// Uma abstração dos métodos necessário no repositório de Orders
export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>;
  findMany(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  delete(id: string): Promise<void | null>;
  update(id: string, data: { value: number }): Promise<Order | null>;
}
