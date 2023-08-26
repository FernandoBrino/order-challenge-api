import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteOrderService } from "./delete-order";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

describe("Delete Order Service", () => {
  let ordersRepository: InMemoryOrdersRepository;
  let usersRepository: InMemoryUsersRepository;
  let sut: DeleteOrderService;

  describe("Get Order By Id Service", () => {
    beforeEach(async () => {
      ordersRepository = new InMemoryOrdersRepository();
      usersRepository = new InMemoryUsersRepository();
      sut = new DeleteOrderService(ordersRepository);

      await usersRepository.create({
        id: "1",
        email: "example@example.com",
        password: "123456",
      });
    });

    it("should be able to delete a order by id", async () => {
      const createdOrder = await ordersRepository.create({
        userId: "1",
        orderId: "1234",
        value: 100,
        creationDate: new Date(),
      });

      await sut.execute({
        id: createdOrder.orderId,
        userId: "1",
      });

      const order = await ordersRepository.findById(createdOrder.orderId, "1");

      expect(order).toBeNull();
    });

    it("should not be able to delete a order with wrong id", async () => {
      await expect(() =>
        sut.execute({
          id: "non-existing-id",
          userId: "non-existing-id",
        })
      ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
  });
});
