import { OrdersRepository } from "@/repositories/orders-repository";
import { Order } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetOrderByIdServiceRequest {
  id: string;
  userId: string;
}

interface GetOrderByIdServiceResponse {
  order: Order;
}

export class GetOrderByIdService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    id,
    userId,
  }: GetOrderByIdServiceRequest): Promise<GetOrderByIdServiceResponse> {
    // Busca um pedido pelo id (número do pedido) enviado
    const order = await this.ordersRepository.findById(id, userId);

    // Retorna um erro caso não exista um pedido referente a id
    if (!order) {
      throw new ResourceNotFoundError();
    }

    return {
      order,
    };
  }
}
