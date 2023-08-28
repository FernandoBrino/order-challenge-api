export const updateOrderByIdSchema = {
  description: "Atualizar um pedido pelo id",
  tags: ["orders"],
  summary: "Atualizar um pedido",
  security: [
    {
      BearerAuth: [],
    },
  ],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Id do pedido",
      },
    },
  },
  body: {
    type: "object",
    properties: {
      valorTotal: {
        type: "number",
        description: "Valor total do pedido",
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
  responses: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        order: {
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
