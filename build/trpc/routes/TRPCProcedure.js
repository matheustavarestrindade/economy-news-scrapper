"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedProcedure = void 0;
var AuthenticationMiddleware_1 = require("../middleware/AuthenticationMiddleware");
var TRPCProvider_1 = require("../TRPCProvider");
exports.authenticatedProcedure = TRPCProvider_1.publicProcedure.use(AuthenticationMiddleware_1.AuthenticationMiddleware);
