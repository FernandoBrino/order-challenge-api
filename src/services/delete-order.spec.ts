import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteOrderService } from "./delete-order";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

describe("Delete Order Service", () => {
  let ordersRepository: InMemoryOrdersRepository;
  let sut: DeleteOrderService;

  describe("Get Order By Id Service", () => {
    beforeEach(() => {
      ordersRepository = new InMemoryOrdersRepository();
      sut = new DeleteOrderService(ordersRepository);
    });

    it("should be able to delete a order by id", async () => {
      const createdOrder = await ordersRepository.create({
        orderId: "1234",
        value: 100,
        creationDate: new Date(),
      });

      await sut.execute({
        id: createdOrder.orderId,
      });

      const order = await ordersRepository.findById(createdOrder.orderId);

      expect(order).toBeNull();
    });

    it("should not be able to delete a order with wrong id", async () => {
      await expect(() =>
        sut.execute({
          id: "non-existing-id",
        })
      ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
  });
});
