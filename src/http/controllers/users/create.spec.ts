import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create User (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create", async () => {
    const response = await request(app.server).post("/users").send({
      password: "123456",
      email: "org@example.com",
    });

    expect(response.statusCode).toEqual(201);
  });
});
