import { Prisma, User } from "@prisma/client";

// Uma abstração dos métodos necessário no repositório de Orders
export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
