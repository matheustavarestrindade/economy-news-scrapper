"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRouter = void 0;
var TRPCProvider_1 = require("../../../TRPCProvider");
var LoginProcedure_1 = require("./LoginProcedure");
var RefreshTokenProcedure_1 = require("./RefreshTokenProcedure");
var RegisterProcedure_1 = require("./RegisterProcedure");
exports.AuthenticationRouter = (0, TRPCProvider_1.router)({
    login: LoginProcedure_1.LoginProcedure,
    register: RegisterProcedure_1.RegisterProcedure,
    refreshToken: RefreshTokenProcedure_1.RefreshTokenProcedure,
});
