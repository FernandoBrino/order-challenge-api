export const createOrderSchema = {
  description: "Criação de um pedido",
  tags: ["orders"],
  summary: "Criação pedido",
  security: [
    {
      BearerAuth: [],
    },
  ],
  body: {
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
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            idItem: {
              type: "string",
              description: "Id do item",
            },
            quantidadeItem: {
              type: "number",
              description: "Quantitdade do item",
            },
            valorItem: {
              type: "number",
              description: "Valor do item",
            },
          },
        },
      },
    },
  },
  response: {
    201: {
      description: "Created successfully",
      type: "null",
    },
    409: {
      description: "Conflict",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  },
};
