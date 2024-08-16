import prismaClient from "../prisma";

interface DeleteUserProps {
  id: number;
}

class DeleteUserService {
  async execute({ id }: DeleteUserProps) {
    if (!id) {
      throw new Error("Solicitação inválida");
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      throw new Error("O usuário não existe");
    }

    await prismaClient.user.delete({
      where: {
        id: findUser.id,
      },
    });

    return { message: "deletado com sucesso" };
  }
}

export { DeleteUserService };
