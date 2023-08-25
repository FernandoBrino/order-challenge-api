import { PrismaClient } from "@prisma/client";

// Inicia o Prisma Client que representa a interface de consulta pro banco de dados
export const prisma = new PrismaClient();
