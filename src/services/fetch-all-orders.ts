import { OrdersRepository } from "@/repositories/orders-repository";
import { Order } from "@prisma/client";

interface FetchAllOrdersServiceResponse {
  orders: Order[];
}

export class FetchAllOrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<FetchAllOrdersServiceResponse> {
    // Buscar por todos pedidos
    const orders = await this.ordersRepository.findMany();

    return {
      orders,
    };
  }
}
