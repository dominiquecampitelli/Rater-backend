import prismaClient from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginUserProps {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: LoginUserProps) {
    if (!email || !password) {
      throw new Error("Preencha os campos");
    }

    const findUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw new Error("E-mail ou senha inválida");
    }

    const verifyPassword = await bcrypt.compare(password, findUser.password);

    if (!verifyPassword) {
      throw new Error("E-mail ou senha inválida");
    }

    const token = jwt.sign(
      { id: findUser.id, name: findUser.name },
      process.env.JWT_SECRET ?? "",
      {
        expiresIn: "365d",
      }
    );

    const { password: _, ...userLogin } = findUser;

    return {
      user: userLogin,
      token: token,
    };
  }
}

export { LoginUserService };
