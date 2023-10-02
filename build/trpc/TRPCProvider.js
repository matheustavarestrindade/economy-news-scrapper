"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.middleware = exports.router = void 0;
var server_1 = require("@trpc/server");
var trpc = server_1.initTRPC.context().create();
exports.router = trpc.router;
exports.middleware = trpc.middleware;
exports.publicProcedure = trpc.procedure;
