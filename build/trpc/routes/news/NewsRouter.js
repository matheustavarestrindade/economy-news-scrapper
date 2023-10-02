"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRouter = void 0;
var TRPCProvider_1 = require("../../TRPCProvider");
var ScrappedNews_1 = require("../../../database/documents/ScrappedNews");
var zod = __importStar(require("zod"));
var MilliTime_1 = __importDefault(require("../../../utils/MilliTime"));
var NewsGetSchema = zod.object({
    cursor: zod.number().nullish(),
    query: zod
        .object({
        query: zod.string().optional(),
        startDate: zod
            .string()
            .transform(function (str) { return new Date(str); })
            .optional(),
        endDate: zod
            .string()
            .transform(function (str) { return new Date(str); })
            .optional(),
        selectedProviders: zod.array(zod.string()).optional(),
        selectedCompanies: zod.array(zod.string()).optional(),
        selectedCryptoCoins: zod.array(zod.string()).optional(),
    })
        .optional(),
});
exports.NewsRouter = (0, TRPCProvider_1.router)({
    get: TRPCProvider_1.publicProcedure.input(NewsGetSchema).query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var cursor, query, SubscriberTime, hasQuery, filters, finalQuery, news, formatedNews;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cursor = input.cursor, query = input.query;
                        SubscriberTime = Date.now() - MilliTime_1.default.MINUTE * 15;
                        hasQuery = (query === null || query === void 0 ? void 0 : query.query) ||
                            (query === null || query === void 0 ? void 0 : query.startDate) ||
                            (query === null || query === void 0 ? void 0 : query.endDate) ||
                            ((query === null || query === void 0 ? void 0 : query.selectedProviders) && query.selectedProviders.length > 0) ||
                            ((query === null || query === void 0 ? void 0 : query.selectedCompanies) && query.selectedCompanies.length > 0) ||
                            ((query === null || query === void 0 ? void 0 : query.selectedCryptoCoins) && query.selectedCryptoCoins.length > 0);
                        filters = [];
                        if (hasQuery) {
                            if (query === null || query === void 0 ? void 0 : query.query)
                                filters.push({
                                    $or: [
                                        { title: { $regex: query.query, $options: "i" } },
                                        { content_summary: { $regex: query.query, $options: "i" } },
                                        { from: { $regex: query.query, $options: "i" } },
                                    ],
                                });
                            if (query === null || query === void 0 ? void 0 : query.startDate)
                                filters.push({ createdAt: { $gte: query.startDate } });
                            if (query === null || query === void 0 ? void 0 : query.endDate)
                                filters.push({ createdAt: { $lte: query.endDate } });
                            if ((query === null || query === void 0 ? void 0 : query.selectedProviders) && query.selectedProviders.length > 0)
                                filters.push({ from: { $in: query.selectedProviders } });
                            if ((query === null || query === void 0 ? void 0 : query.selectedCompanies) && query.selectedCompanies.length > 0)
                                filters.push({ stockCompanies: { $in: query.selectedCompanies } });
                            if ((query === null || query === void 0 ? void 0 : query.selectedCryptoCoins) && query.selectedCryptoCoins.length > 0)
                                filters.push({ cryptoAssets: { $in: query.selectedCryptoCoins } });
                        }
                        finalQuery = hasQuery ? { $and: filters } : {};
                        console.log(query, JSON.stringify(finalQuery));
                        return [4 /*yield*/, ScrappedNews_1.ScrappedNews.find(finalQuery)
                                .sort({ createdAt: -1 })
                                .skip((cursor || 0) * 10)
                                .limit(10)];
                    case 1:
                        news = _b.sent();
                        console.log(news.length);
                        formatedNews = news
                            .map(function (news) { return news.toJSON(); })
                            .map(function (news) {
                            var isForSubscribers = news.createdAt.getTime() > SubscriberTime;
                            return {
                                title: news.title,
                                content_summary: isForSubscribers ? "" : news.content_summary,
                                url: news.url,
                                image: news.image,
                                from: news.from,
                                date: news.createdAt,
                                only_subscribers: isForSubscribers,
                            };
                        });
                        return [2 /*return*/, { news: formatedNews, nextCursor: cursor ? cursor + 1 : 1 }];
                }
            });
        });
    }),
});
