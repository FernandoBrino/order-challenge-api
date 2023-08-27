export const authenticateSchema = {
  description: "Autenticação do usuário",
  tags: ["users"],
  summary: "Autenticação",
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "E-mail do usuário",
      },
      password: {
        type: "string",
        description: "Senha do usuário",
      },
    },
  },
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        token: {
          type: "string",
        },
      },
    },
    400: {
      description: "Bad Request",
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  },
};
