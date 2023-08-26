import { Order, Prisma } from "@prisma/client";

// Uma abstração dos métodos necessário no repositório de Orders
export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>;
  findMany(userId: string): Promise<Order[] | null>;
  findById(id: string, userId: string): Promise<Order | null>;
  delete(id: string, userId: string): Promise<void | null>;
  update(
    id: string,
    userId: string,
    data: { value: number }
  ): Promise<Order | null>;
}
