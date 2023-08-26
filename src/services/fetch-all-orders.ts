import { OrdersRepository } from "@/repositories/orders-repository";
import { Order } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchAllOrdersServiceRequest {
  userId: string;
}

interface FetchAllOrdersServiceResponse {
  orders: Order[];
}

export class FetchAllOrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    userId,
  }: FetchAllOrdersServiceRequest): Promise<FetchAllOrdersServiceResponse> {
    // Buscar por todos pedidos
    const orders = await this.ordersRepository.findMany(userId);

    if (!orders) {
      throw new ResourceNotFoundError();
    }

    return {
      orders,
    };
  }
}
