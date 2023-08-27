export const createUserSchema = {
  description: "Criação do usuário",
  tags: ["users"],
  summary: "Criação usuário",
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
