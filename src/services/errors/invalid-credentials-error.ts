// Erro personalizado para dados não encontrados.
export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials.");
  }
}
