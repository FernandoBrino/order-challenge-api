import { OrdersRepository } from "@/repositories/orders-repository";
import { Item, Order } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ItemsRepository } from "@/repositories/items-repository";

interface GetOrderByIdServiceRequest {
  id: string;
  userId: string;
}

interface GetOrderByIdServiceResponse {
  order: Order;
  orderItems: Item[];
}

export class GetOrderByIdService {
  constructor(
    private ordersRepository: OrdersRepository,
    private itemsRepository: ItemsRepository
  ) {}

  async execute({
    id,
    userId,
  }: GetOrderByIdServiceRequest): Promise<GetOrderByIdServiceResponse> {
    // Busca um pedido pelo id (número do pedido) enviado
    const order = await this.ordersRepository.findById(id, userId);
    const orderItems = await this.itemsRepository.getItemsByOrderId(id);

    // Retorna um erro caso não exista um pedido referente a id
    if (!order) {
      throw new ResourceNotFoundError();
    }

    return {
      order,
      orderItems,
    };
  }
}
