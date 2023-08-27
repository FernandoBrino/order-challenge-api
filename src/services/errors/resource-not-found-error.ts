// Erro personalizado para dados não encontrados
export class ResourceNotFoundError extends Error {
  constructor() {
    super("Resource not found.");
  }
}
