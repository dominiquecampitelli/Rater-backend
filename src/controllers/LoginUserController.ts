import { FastifyRequest, FastifyReply } from "fastify";
import { LoginUserService } from "../services/LoginUserService";

class LoginUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const loginUserService = new LoginUserService();

    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      const user = await loginUserService.execute({ email, password });

      return reply.status(200).send(user);
    } catch (error) {
      return reply.status(400).send({ error: "Usuário não encontrado" });
    }
  }
}

export { LoginUserController };
