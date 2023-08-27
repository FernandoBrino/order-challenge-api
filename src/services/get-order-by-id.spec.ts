import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { GetOrderByIdService } from "./get-order-by-id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryItemsRepository } from "@/repositories/in-memory/in-memory-items-repository";

let ordersRepository: InMemoryOrdersRepository;
let itemsRepository: InMemoryItemsRepository;
let usersRepository: InMemoryUsersRepository;
let sut: GetOrderByIdService;

describe("Get Order By Id Service", () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();
    itemsRepository = new InMemoryItemsRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new GetOrderByIdService(ordersRepository, itemsRepository);

    await usersRepository.create({
      id: "1",
      email: "example@example.com",
      password: "123456",
    });
  });

  it("should be able to find a order by id", async () => {
    const createdOrder = await ordersRepository.create({
      userId: "1",
      orderId: "1234",
      value: 100,
      creationDate: new Date(),
    });

    await itemsRepository.create([
      {
        orderId: createdOrder.orderId,
        productId: "123",
        quantity: 1,
        price: 500,
      },
    ]);

    const { order, orderItems } = await sut.execute({
      id: createdOrder.orderId,
      userId: "1",
    });

    expect(order.orderId).toEqual(expect.any(String));
    expect(orderItems).toEqual([
      expect.objectContaining({
        productId: "123",
        quantity: 1,
        price: 500,
      }),
    ]);
  });

  it("should not be able to find a order with wrong id", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id",
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
