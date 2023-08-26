import { OrdersRepository } from "@/repositories/orders-repository";
import { Order } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ItemsRepository } from "@/repositories/items-repository";
import { UpdateItem } from "@/@types/update-item";

type UpdateOrder = {
  value: number;
  items: UpdateItem[];
};

interface UpdateOrderByIdServiceRequest {
  id: string;
  userId: string;
  data: UpdateOrder;
}

interface UpdateOrderByIdServiceResponse {
  order: Order;
}

export class UpdateOrderByIdService {
  constructor(
    private ordersRepository: OrdersRepository,
    private itemsRepository: ItemsRepository
  ) {}

  async execute({
    id,
    userId,
    data,
  }: UpdateOrderByIdServiceRequest): Promise<UpdateOrderByIdServiceResponse> {
    // Atualiza os valores dentro do pedido.
    const order = await this.ordersRepository.update(id, userId, {
      value: data.value,
    });

    // Atualiza os itens referentes ao pedido
    const items = await this.itemsRepository.updateMany(id, data.items);

    // Retorna um erro caso não exista um pedido referente a id
    if (!order || !items) {
      throw new ResourceNotFoundError();
    }

    return {
      order,
    };
  }
}
