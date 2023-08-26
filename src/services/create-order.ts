import { ItemsRepository } from "@/repositories/items-repository";
import { OrdersRepository } from "@/repositories/orders-repository";
import { Order } from "@prisma/client";

type Item = {
  idItem: string;
  quantidadeItem: number;
  valorItem: number;
};

interface CreateOrderServiceRequest {
  numeroPedido: string;
  valorTotal: number;
  dataCriacao: string;
  items: Item[];
}

interface CreateOrderServiceResponse {
  order: Order;
}

export class CreateOrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private itemsRepository: ItemsRepository
  ) {}

  async execute({
    numeroPedido,
    valorTotal,
    dataCriacao,
    items,
  }: CreateOrderServiceRequest): Promise<CreateOrderServiceResponse> {
    // Mapeia e muda a estrutura dos items
    const formattedItems = items.map(
      ({ idItem, quantidadeItem, valorItem }) => ({
        orderId: numeroPedido,
        productId: idItem,
        quantity: quantidadeItem,
        price: valorItem,
      })
    );

    // Insere os dados no banco
    const order = await this.ordersRepository.create({
      orderId: numeroPedido,
      value: valorTotal,
      creationDate: dataCriacao,
    });

    // Cria todos items;
    await this.itemsRepository.create(formattedItems);

    return {
      order,
    };
  }
}
