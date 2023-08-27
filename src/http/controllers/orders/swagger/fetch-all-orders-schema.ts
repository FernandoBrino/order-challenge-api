export const fetchAllOrdersSchema = {
  description: "Buscar todos pedidos do usuário",
  tags: ["orders"],
  summary: "Buscar todos pedidos",
  security: [
    {
      BearerAuth: [],
    },
  ],
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        orders: {
          type: "array",
          items: {
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
