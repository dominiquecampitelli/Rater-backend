import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const port = process.env.PORT || 3333;

const start = async () => {
  await app.register(cors);
  await app.register(routes);

  try {
    await app.listen({ port: Number(port) });
  } catch (err) {
    process.exit(1);
  }
};

start();
