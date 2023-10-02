"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWTService = /** @class */ (function () {
    function JWTService() {
    }
    JWTService.generateToken = function (payload) {
        var token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "123", {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return token;
    };
    JWTService.verifyToken = function (token) {
        try {
            var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "123");
            return decoded;
        }
        catch (error) {
            return null;
        }
    };
    return JWTService;
}());
exports.default = JWTService;
