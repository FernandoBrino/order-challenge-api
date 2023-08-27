// Tipagem do objeto recebido para atualizar um pedido
export type UpdateItem = {
  idItem: string;
  quantidadeItem?: number;
  valorItem?: number;
};

// Tipagem do objeto formatado para atualizar um pedido
export type UpdateItemFormatted = {
  productId: string;
  quantity?: number;
  price?: number;
};
