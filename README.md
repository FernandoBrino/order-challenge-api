# Order Challenge API

Esta é uma API Restful desenvolvida utilizando [Fastify](https://fastify.dev), vizando o realizar um desafio para a empresa Jitterbit.

## Descrição

A Order Challenge Api é uma aplicação que visa fazer um gerenciamento básico de pedidos e items.

## Recursos

A API oferece os seguintes recursos:

- **Usuários**: Operações básicas como criação de um usuário, autenticação;

- **Pedidos**: Operações como criação de um pedido, busca pelo id, busca de todos pedidos, atualização de um pedido e remoção de um pedido.

## Instalação

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local:

1. Clone este repositório para o seu computador utilizando o comando:

```shell
git clone https://github.com/FernandoBrino/api-rest-fastify.git
```

2. Acesse o diretório do projeto:

```shell
cd order-challenge-api
```

3. Instale as dependências do projeto:

```shell
npm install
```


4. Rode o Docker compose:

```shell
docker compose up
```

5. Inicie o banco de dados:
6. 
 ```shell
docker compose start
```

6. Rode as migrations do projeto:

```shell
npx prisma migrate dev
```

7. Inicie o servidor de desenvolvimento:

```shell
npm start
```

8. Crie o arquivo .env e copie o .env.example para dentro dele.

10. O servidor estará em execução localmente em `http://localhost:3333`.

## Utilização

**É possível realizar todas ações da api acessando `http://localhost:3333/documentation`, onde estará disponível Swagger da api.**

Certifique-se de substituir `:id` pelos identificadores reais dos usuários ou produtos ao fazer requisições específicas.

Certifique-se de adicionar `Bearer ${token}` na autorização.

## Testes

Para rodar os testes unitários basta executar no terminal: 
```shell
npm run test
```

Para rodar os testes e2e basta executar no terminal: 
```shell
npm run test:e2e
```

Lembre-se que para rodar os teste e2e é necessário que o banco esteja executando no docker.

## Contribuição

Contribuições são bem-vindas! Se você encontrou algum problema, tem sugestões ou deseja adicionar novos recursos, fique à vontade para abrir uma *issue* ou enviar um *pull request*.

## Licença

Este projeto está licenciado sob a ISC License.

---
Criado por [Fernando Brino](https://github.com/FernandoBrino)
