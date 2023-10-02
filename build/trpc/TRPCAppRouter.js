"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRPCRouter = void 0;
var TRPCProvider_1 = require("./TRPCProvider");
var UserRouter_1 = require("./routes/user/UserRouter");
var NewsRouter_1 = require("./routes/news/NewsRouter");
var StocksRouter_1 = require("./routes/stocks/StocksRouter");
var CryptoRouter_1 = require("./routes/crypto/CryptoRouter");
exports.TRPCRouter = (0, TRPCProvider_1.router)({
    user: UserRouter_1.UserRouter,
    news: NewsRouter_1.NewsRouter,
    stocks: StocksRouter_1.StocksRouter,
    crypto: CryptoRouter_1.CryptoRouter,
});
