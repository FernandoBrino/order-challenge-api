import { app } from "./app";
import { env } from "./env";
// Inicializa o servidor
app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`HTTP Server Running on port ${env.PORT}`);
  });
