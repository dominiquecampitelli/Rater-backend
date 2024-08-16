import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../services/CreateUserService";
import bcrypt from "bcrypt";

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    try {
      const userService = new CreateUserService();
      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = await userService.execute({
        name,
        email,
        password: hashedPassword,
      });

      reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send({ error: "Falha ao criar usuário" });
    }
  }
}

export { CreateUserController };
