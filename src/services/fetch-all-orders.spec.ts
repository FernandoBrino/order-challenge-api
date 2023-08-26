import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchAllOrdersService } from "./fetch-all-orders";

let ordersRepository: InMemoryOrdersRepository;
let sut: FetchAllOrdersService;

describe("Fetch All Orders Service", () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository();
    sut = new FetchAllOrdersService(ordersRepository);
  });

  it("should fetch all orders", async () => {
    ordersRepository.create({
      orderId: "1234",
      value: 1000,
      creationDate: new Date(),
    });

    const { orders } = await sut.execute();

    expect(orders).toEqual([
      expect.objectContaining({
        orderId: "1234",
        value: 1000,
      }),
    ]);
  });
});
