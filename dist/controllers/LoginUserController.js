"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserController = void 0;
const LoginUserService_1 = require("../services/LoginUserService");
class LoginUserController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginUserService = new LoginUserService_1.LoginUserService();
            try {
                const { email, password } = request.body;
                const user = yield loginUserService.execute({ email, password });
                return reply.status(200).send(user);
            }
            catch (error) {
                return reply.status(400).send({ error: "Usuário não encontrado" });
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
