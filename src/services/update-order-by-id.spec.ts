import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UpdateOrderByIdService } from "./update-order-by-id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryItemsRepository } from "@/repositories/in-memory/in-memory-items-repository";

let ordersRepository: InMemoryOrdersRepository;
let itemsRepository: InMemoryItemsRepository;
let sut: UpdateOrderByIdService;

describe("Update Order By Id Service", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    itemsRepository = new InMemoryItemsRepository();
    sut = new UpdateOrderByIdService(ordersRepository, itemsRepository);
  });

  it("shoul be able to update a order by id", async () => {
    const createdOrder = await ordersRepository.create({
      orderId: "123",
      value: 100,
      creationDate: new Date(),
    });

    const orderItem = await itemsRepository.create([
      {
        productId: "1234",
        quantity: 100,
        price: 200,
        orderId: createdOrder.orderId,
      },
    ]);

    const { order } = await sut.execute({
      id: createdOrder.orderId,
      data: {
        value: 1000,
        items: [
          {
            productId: "1234",
            quantity: 100,
            price: 3000,
          },
        ],
      },
    });

    expect(order).toEqual(
      expect.objectContaining({
        value: 1000,
      })
    );

    expect(orderItem).toEqual([
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
        data: {
          value: 0,
          items: [],
        },
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
