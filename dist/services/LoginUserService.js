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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            var _b;
            if (!email || !password) {
                throw new Error("Preencha os campos");
            }
            const findUser = yield prisma_1.default.user.findUnique({
                where: {
                    email,
                },
            });
            if (!findUser) {
                throw new Error("E-mail ou senha inválida");
            }
            const verifyPassword = yield bcrypt_1.default.compare(password, findUser.password);
            if (!verifyPassword) {
                throw new Error("E-mail ou senha inválida");
            }
            const token = jsonwebtoken_1.default.sign({ id: findUser.id, name: findUser.name }, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "", {
                expiresIn: "365d",
            });
            const { password: _ } = findUser, userLogin = __rest(findUser, ["password"]);
            return {
                user: userLogin,
                token: token,
            };
        });
    }
}
exports.LoginUserService = LoginUserService;
