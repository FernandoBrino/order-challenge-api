import { OrdersRepository } from "@/repositories/orders-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteOrderServiceRequest {
  id: string;
}

export class DeleteOrderService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ id }: DeleteOrderServiceRequest): Promise<void> {
    // Busca um pedido pelo id (número do pedido) enviado
    const order = await this.ordersRepository.delete(id);

    // Retorna um erro caso não exista um pedido referente a id
    if (order === null) {
      throw new ResourceNotFoundError();
    }
  }
}
