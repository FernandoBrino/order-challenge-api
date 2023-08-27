import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Update Order By Id (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update by id", async () => {
    const { token, userId } = await createAndAuthenticateUser(app);

    const order = await prisma.order.create({
      data: {
        userId,
        orderId: "1234",
        value: 1000,
        creationDate: new Date(),
      },
    });

    await prisma.item.create({
      data: {
        productId: "1",
        orderId: order.orderId,
        quantity: 1,
        price: 100,
      },
    });

    const response = await request(app.server)
      .put(`/order/${order.orderId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        valorTotal: 2000,
        items: [
          {
            idItem: "1",
            quantidadeItem: 5,
            valorItem: 500,
          },
        ],
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        order: expect.objectContaining({
          value: 2000,
        }),
        items: expect.arrayContaining([
          expect.objectContaining({
            quantity: 5,
            price: 500,
          }),
        ]),
      })
    );
  });
});
