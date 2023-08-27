export const createOrderByIdSchema = {
  description: "Buscar um pedido pelo id",
  tags: ["orders"],
  summary: "Buscar por um pedido",
  security: [
    {
      BearerAuth: [],
    },
  ],
  params: {
    type: "object",
    properties: {
      numeroPedido: {
        type: "string",
        description: "Id do pedido",
      },
    },
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        numeroPedido: {
          type: "string",
          description: "Id do pedido",
        },
        valorTotal: {
          type: "number",
          description: "Valor total do pedido",
        },
        dataCriacao: {
          type: "string",
          description: "Data de criação do pedido",
        },
      },
    },
    404: {
      description: "Not Found",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  },
};
