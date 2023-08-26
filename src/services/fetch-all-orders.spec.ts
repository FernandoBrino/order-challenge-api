import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchAllOrdersService } from "./fetch-all-orders";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let ordersRepository: InMemoryOrdersRepository;
let usersRepository: InMemoryUsersRepository;
let sut: FetchAllOrdersService;

describe("Fetch All Orders Service", () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();
    usersRepository = new InMemoryUsersRepository();
    sut = new FetchAllOrdersService(ordersRepository);

    await usersRepository.create({
      id: "1",
      email: "example@example.com",
      password: "123456",
    });
  });

  it("should fetch all orders", async () => {
    await ordersRepository.create({
      userId: "1",
      orderId: "1234",
      value: 1000,
      creationDate: new Date(),
    });

    const { orders } = await sut.execute({ userId: "1" });

    expect(orders).toEqual([
      expect.objectContaining({
        orderId: "1234",
        value: 1000,
      }),
    ]);
  });
});
