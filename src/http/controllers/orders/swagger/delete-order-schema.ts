export const deleteOrderSchema = {
  description: "Deletar um pedido pelo id",
  tags: ["orders"],
  summary: "Deletar por um pedido",
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
    204: {
      description: "Success with no content",
      type: "null",
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
