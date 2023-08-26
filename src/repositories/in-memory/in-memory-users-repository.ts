import { randomUUID } from "node:crypto";
import { UsersRepository } from "../users-repository";
import { Prisma, User } from "@prisma/client";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  // Busca um usuário pelo Id
  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  // Busca um usuário pelo email
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  // Cria um novo usuário
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
    };

    this.items.push(user);

    return user;
  }
}
