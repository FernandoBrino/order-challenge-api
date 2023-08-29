import { ItemsRepository } from "@/repositories/items-repository";
import { OrdersRepository } from "@/repositories/orders-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Order } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type ItemRequest = {
  idItem: string;
  quantidadeItem: number;
  valorItem: number;
};

interface CreateOrderServiceRequest {
  userId: string;
  numeroPedido: string;
  valorTotal: number;
  dataCriacao: string;
  items: ItemRequest[];
}

interface CreateOrderServiceResponse {
  order: Order;
}

export class CreateOrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private itemsRepository: ItemsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    numeroPedido,
    valorTotal,
    dataCriacao,
    items,
  }: CreateOrderServiceRequest): Promise<CreateOrderServiceResponse> {
    // Verifica se o usuário existe
    const user = await this.usersRepository.findById(userId);

    // Retorna um erro caso o usuário já exista
    if (!user) {
      throw new ResourceNotFoundError();
    }

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
      userId,
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
