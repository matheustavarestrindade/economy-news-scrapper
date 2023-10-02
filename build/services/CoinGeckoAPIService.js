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
Object.defineProperty(exports, "__esModule", { value: true });
var CoinGeckoAPIService = /** @class */ (function () {
    function CoinGeckoAPIService() {
    }
    CoinGeckoAPIService.listCoins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.COIN_LIST_URL)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        json = _a.sent();
                        if (!Array.isArray(json))
                            return [2 /*return*/, []];
                        return [2 /*return*/, json];
                }
            });
        });
    };
    CoinGeckoAPIService.getCoinInfo = function (coin) {
        return __awaiter(this, void 0, void 0, function () {
            var data, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.COIN_INFO_URL.replace("{{coin}}", coin))];
                    case 1:
                        data = _a.sent();
                        if (!data.ok)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, json];
                }
            });
        });
    };
    CoinGeckoAPIService.getTop100Coins = function () {
        return __awaiter(this, void 0, void 0, function () {
            var coins, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.COIN_TOP100_URL)];
                    case 1:
                        coins = _a.sent();
                        if (!coins.ok)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, coins.json()];
                    case 2:
                        json = _a.sent();
                        if (!Array.isArray(json))
                            return [2 /*return*/, []];
                        return [2 /*return*/, json];
                }
            });
        });
    };
    CoinGeckoAPIService.COIN_LIST_URL = "https://api.coingecko.com/api/v3/coins/list";
    CoinGeckoAPIService.COIN_INFO_URL = "https://api.coingecko.com/api/v3/coins/{{coin}}";
    CoinGeckoAPIService.COIN_TOP100_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    return CoinGeckoAPIService;
}());
exports.default = CoinGeckoAPIService;
