import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { GetOrderByIdService } from "./get-order-by-id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let ordersRepository: InMemoryOrdersRepository;
let sut: GetOrderByIdService;

describe("Get Order By Id Service", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new GetOrderByIdService(ordersRepository);
  });

  it("should be able to find a order by id", async () => {
    const createdOrder = await ordersRepository.create({
      orderId: "1234",
      value: 100,
      creationDate: new Date(),
    });

    const { order } = await sut.execute({
      id: createdOrder.orderId,
    });

    expect(order.orderId).toEqual(expect.any(String));
  });

  it("should not be able to find a order with wrong id", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
