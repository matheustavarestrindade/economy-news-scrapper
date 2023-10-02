"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var TRPCProvider_1 = require("../../TRPCProvider");
var AuthenticationRouter_1 = require("./authenticaton/AuthenticationRouter");
exports.UserRouter = (0, TRPCProvider_1.router)({
    authentication: AuthenticationRouter_1.AuthenticationRouter,
});
