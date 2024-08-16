import jwt, { JwtPayload } from "jsonwebtoken";

async function Authentication(request: any, reply: any) {
  if (request.headers.authorization) {
    try {
      const token = request.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(
        token,
        process.env.JWT_SECRET ?? ""
      ) as JwtPayload;
    } catch (err) {
      reply.code(401).send(err);
    }
  } else {
    reply.code(401).send({ message: "Token não fornecido" });
  }
}

export default Authentication;
