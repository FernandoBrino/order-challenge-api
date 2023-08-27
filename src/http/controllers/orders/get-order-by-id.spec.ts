import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Order By Id (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get by id", async () => {
    const { token, userId } = await createAndAuthenticateUser(app);

    const order = await prisma.order.create({
      data: {
        userId,
        orderId: "1234",
        value: 1000,
        creationDate: new Date(),
      },
    });

    const response = await request(app.server)
      .get(`/order/${order.orderId}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.order).toEqual(
      expect.objectContaining({
        orderId: "1234",
        value: 1000,
      })
    );
  });
});