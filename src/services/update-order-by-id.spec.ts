import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateOrderByIdService } from "./update-order-by-id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryItemsRepository } from "@/repositories/in-memory/in-memory-items-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let ordersRepository: InMemoryOrdersRepository;
let itemsRepository: InMemoryItemsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: UpdateOrderByIdService;

describe("Update Order By Id Service", () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();
    usersRepository = new InMemoryUsersRepository();
    itemsRepository = new InMemoryItemsRepository();
    sut = new UpdateOrderByIdService(ordersRepository, itemsRepository);

    await usersRepository.create({
      id: "1",
      email: "example@example.com",
      password: "123456",
    });
  });

  it("shoul be able to update a order by id", async () => {
    const createdOrder = await ordersRepository.create({
      userId: "1",
      orderId: "123",
      value: 100,
      creationDate: new Date(),
    });

    await itemsRepository.create([
      {
        productId: "1234",
        quantity: 100,
        price: 200,
        orderId: createdOrder.orderId,
      },
    ]);

    const { order, orderItems } = await sut.execute({
      id: createdOrder.orderId,
      userId: "1",
      valorTotal: 1000,
      items: [
        {
          idItem: "1234",
          quantidadeItem: 100,
          valorItem: 3000,
        },
      ],
    });

    expect(order).toEqual(
      expect.objectContaining({
        value: 1000,
      })
    );

    expect(orderItems).toEqual([
      expect.objectContaining({
        productId: "1234",
        quantity: 100,
        price: 3000,
      }),
    ]);
  });

  it("should not be able to update a order with wrong id", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id",
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
