// Erro personalizado para credenciais invalidas
export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials.");
  }
}
