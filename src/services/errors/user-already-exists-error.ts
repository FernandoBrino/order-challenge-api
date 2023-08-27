// Erro personalizado para usuário ja existente
export class UserAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exists.");
  }
}
