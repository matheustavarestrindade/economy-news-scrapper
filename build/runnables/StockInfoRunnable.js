"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var MilliTime_1 = __importDefault(require("../utils/MilliTime"));
var TaskRepeatingRunnable_1 = __importDefault(require("./TaskRepeatingRunnable"));
var StockCompany_1 = require("../database/documents/StockCompany");
var StockMarketAPIService_1 = __importDefault(require("../services/StockMarketAPIService"));
var Debug_1 = __importDefault(require("../utils/Debug"));
var ImageDownloader_1 = __importDefault(require("../services/ImageDownloader"));
var StockInfoRunnable = /** @class */ (function (_super) {
    __extends(StockInfoRunnable, _super);
    function StockInfoRunnable() {
        return _super.call(this, 0, MilliTime_1.default.MINUTE * 10) || this;
    }
    StockInfoRunnable.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stocks, stockSymbols, stockChunks, stockQuotes, _i, stockQuotes_1, stockQuoteChunk, _loop_1, _a, stockQuoteChunk_1, stockQuote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.needsUpdate()];
                    case 1:
                        if (!(_b.sent()))
                            return [2 /*return*/];
                        return [4 /*yield*/, StockMarketAPIService_1.default.queryStocksInfo()];
                    case 2:
                        stocks = _b.sent();
                        if (!stocks) {
                            Debug_1.default.warn("Could not fetch stocks from BRAPI");
                            return [2 /*return*/];
                        }
                        stockSymbols = stocks.map(function (stock) { return stock.stock; });
                        stockChunks = stockSymbols.reduce(function (acc, stock) {
                            if (acc.length === 0) {
                                acc.push([stock]);
                            }
                            else {
                                var lastChunk = acc[acc.length - 1];
                                if (lastChunk.length === 20) {
                                    acc.push([stock]);
                                }
                                else {
                                    lastChunk.push(stock);
                                }
                            }
                            return acc;
                        }, []);
                        return [4 /*yield*/, Promise.all(stockChunks.map(function (chunk) { return StockMarketAPIService_1.default.queryStockQuote(chunk.join(",")); }))];
                    case 3:
                        stockQuotes = _b.sent();
                        _i = 0, stockQuotes_1 = stockQuotes;
                        _b.label = 4;
                    case 4:
                        if (!(_i < stockQuotes_1.length)) return [3 /*break*/, 9];
                        stockQuoteChunk = stockQuotes_1[_i];
                        _loop_1 = function (stockQuote) {
                            var stock, stockFromDatabse, base64Logo, _c, _d, e_1;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        stock = stocks.find(function (stock) { return stock.stock === stockQuote.symbol; });
                                        return [4 /*yield*/, StockCompany_1.StockCompany.findOne({ stock: stockQuote.symbol })];
                                    case 1:
                                        stockFromDatabse = _e.sent();
                                        if (!stock)
                                            return [2 /*return*/, "continue"];
                                        _e.label = 2;
                                    case 2:
                                        _e.trys.push([2, 9, , 10]);
                                        if (!(stockFromDatabse === null || stockFromDatabse === void 0 ? void 0 : stockFromDatabse.logo))
                                            Debug_1.default.info("Logo of stock ".concat(stock.stock, " don't exists, downloading..."));
                                        if (!(stockFromDatabse === null || stockFromDatabse === void 0 ? void 0 : stockFromDatabse.logo)) return [3 /*break*/, 3];
                                        _c = stockFromDatabse.logo;
                                        return [3 /*break*/, 7];
                                    case 3:
                                        if (!stock.logo) return [3 /*break*/, 5];
                                        return [4 /*yield*/, ImageDownloader_1.default.downloadImageAsBase64(stock.logo)];
                                    case 4:
                                        _d = _e.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        _d = null;
                                        _e.label = 6;
                                    case 6:
                                        _c = _d;
                                        _e.label = 7;
                                    case 7:
                                        base64Logo = _c;
                                        return [4 /*yield*/, StockCompany_1.StockCompany.updateOne({ stock: stock.stock }, {
                                                stock: stock.stock,
                                                shortName: stock.name,
                                                market_cap: stock.market_cap,
                                                logo: base64Logo,
                                                sector: stock.sector,
                                                fullName: stockQuote.longName,
                                            }, { upsert: true })];
                                    case 8:
                                        _e.sent();
                                        return [3 /*break*/, 10];
                                    case 9:
                                        e_1 = _e.sent();
                                        Debug_1.default.error("Error downloading logo of stock ".concat(stock.stock, ": ").concat(e_1));
                                        return [2 /*return*/, "continue"];
                                    case 10: return [2 /*return*/];
                                }
                            });
                        };
                        _a = 0, stockQuoteChunk_1 = stockQuoteChunk;
                        _b.label = 5;
                    case 5:
                        if (!(_a < stockQuoteChunk_1.length)) return [3 /*break*/, 8];
                        stockQuote = stockQuoteChunk_1[_a];
                        return [5 /*yield**/, _loop_1(stockQuote)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        _a++;
                        return [3 /*break*/, 5];
                    case 8:
                        _i++;
                        return [3 /*break*/, 4];
                    case 9:
                        Debug_1.default.info("Updated stocks");
                        return [2 /*return*/];
                }
            });
        });
    };
    StockInfoRunnable.prototype.needsUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastStock;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, StockCompany_1.StockCompany.findOne({}).sort({ lastUpdate: -1 }).limit(1)];
                    case 1:
                        lastStock = _a.sent();
                        if (lastStock && lastStock.updatedAt.getTime() > new Date().getTime() - MilliTime_1.default.MINUTE * 10) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return StockInfoRunnable;
}(TaskRepeatingRunnable_1.default));
exports.default = StockInfoRunnable;
