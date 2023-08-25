import "dotenv/config";
import { z } from "zod";

// Cria um schema de validação
const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
});

// Valida as variaveis de ambiente baseado no "envSchema"
const _env = envSchema.safeParse(process.env);

// Lança um erro caso o arquivo env não esteja corretamente preenchido.
if (_env.success === false) {
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
