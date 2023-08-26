import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryItemsRepository } from "@/repositories/in-memory/in-memory-items-repository";
import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { CreateOrderService } from "./create-order";

let ordersRepository: InMemoryOrdersRepository;
let itemsRepository: InMemoryItemsRepository;
let sut: CreateOrderService;

describe("Create Order Service", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    itemsRepository = new InMemoryItemsRepository();
    sut = new CreateOrderService(ordersRepository, itemsRepository);
  });

  it("should be able to create", async () => {
    const { order } = await sut.execute({
      numeroPedido: "54321",
      valorTotal: 1000,
      dataCriacao: new Date().toLocaleString(),
      items: [
        {
          idItem: "12345",
          quantidadeItem: 1,
          valorItem: 1000,
        },
      ],
    });

    expect(order.orderId).toEqual(expect.any(String));
  });
});
