import { app } from "./app";

// Inicializa o servidor
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
