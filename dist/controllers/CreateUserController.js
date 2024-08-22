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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../services/CreateUserService");
const bcrypt_1 = __importDefault(require("bcrypt"));
class CreateUserController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = request.body;
            try {
                const userService = new CreateUserService_1.CreateUserService();
                const hashedPassword = bcrypt_1.default.hashSync(password, 10);
                const user = yield userService.execute({
                    name,
                    email,
                    password: hashedPassword,
                });
                reply.status(201).send(user);
            }
            catch (error) {
                reply.status(400).send({ error: "Falha ao criar usuário" });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
