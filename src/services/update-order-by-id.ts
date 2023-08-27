import { OrdersRepository } from "@/repositories/orders-repository";
import { Item, Order } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ItemsRepository } from "@/repositories/items-repository";
import { UpdateItem } from "@/@types/update-item";

interface UpdateOrderByIdServiceRequest {
  id: string;
  userId: string;
  valorTotal?: number;
  items?: UpdateItem[];
}

interface UpdateOrderByIdServiceResponse {
  order: Order;
  orderItems: Item[];
}

export class UpdateOrderByIdService {
  constructor(
    private ordersRepository: OrdersRepository,
    private itemsRepository: ItemsRepository
  ) {}

  async execute({
    id,
    userId,
    valorTotal,
    items,
  }: UpdateOrderByIdServiceRequest): Promise<UpdateOrderByIdServiceResponse> {
    let order;
    let orderItems;

    // Atualiza os valores dentro do pedido.
    if (valorTotal) {
      order = await this.ordersRepository.update(id, userId, {
        value: valorTotal,
      });
    }

    // Atualiza os itens referentes ao pedido
    if (items) {
      // Mapeia e formata o objeto recebido devidamente
      const formattedItems = items.map(
        ({ idItem, quantidadeItem, valorItem }) => ({
          productId: idItem,
          quantity: quantidadeItem,
          price: valorItem,
        })
      );

      // Atualiza os itens
      orderItems = await this.itemsRepository.updateMany(id, formattedItems);
    }

    // Retorna um erro caso não exista um pedido referente a id
    if (!order || !orderItems) {
      throw new ResourceNotFoundError();
    }

    return {
      order,
      orderItems,
    };
  }
}
