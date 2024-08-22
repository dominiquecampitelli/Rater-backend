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
exports.routes = routes;
const auth_1 = __importDefault(require("./middleware/auth"));
const CreateUserController_1 = require("./controllers/CreateUserController");
const ListUsersController_1 = require("./controllers/ListUsersController");
const DeleteUserController_1 = require("./controllers/DeleteUserController");
const LoginUserController_1 = require("./controllers/LoginUserController");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/user/register", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new CreateUserController_1.CreateUserController().handle(request, reply);
        }));
        fastify.post("/user/login", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new LoginUserController_1.LoginUserController().handle(request, reply);
        }));
        fastify.get("/users", { preHandler: [auth_1.default] }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListUsersController_1.ListUsersController().handle(request, reply);
        }));
        fastify.delete("/user/delete", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new DeleteUserController_1.DeleteUserController().handle(request, reply);
        }));
    });
}
