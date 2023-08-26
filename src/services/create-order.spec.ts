import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryItemsRepository } from "@/repositories/in-memory/in-memory-items-repository";
import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { CreateOrderService } from "./create-order";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let ordersRepository: InMemoryOrdersRepository;
let itemsRepository: InMemoryItemsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: CreateOrderService;

describe("Create Order Service", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    itemsRepository = new InMemoryItemsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateOrderService(
      ordersRepository,
      itemsRepository,
      usersRepository
    );
  });

  it("should be able to create", async () => {
    const user = await usersRepository.create({
      email: "example@example.com",
      password: "123456",
    });

    const { order } = await sut.execute({
      userId: user.id,
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
