import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Order (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        numeroPedido: "1234",
        valorTotal: 1000,
        dataCriacao: new Date(),
        items: [{ idItem: "12", quantidadeItem: 1, valorItem: 1000 }],
      });

    expect(response.statusCode).toEqual(201);
  });
});
