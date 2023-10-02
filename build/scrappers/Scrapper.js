"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var jsdom_1 = require("jsdom");
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var ScrappedNews_1 = require("../database/documents/ScrappedNews");
var last_scrape_json_1 = __importDefault(require("./../last_scrape.json"));
var promises_1 = __importDefault(require("fs/promises"));
var SummaryNewsService_1 = __importDefault(require("../services/SummaryNewsService"));
var InformationExtractor_1 = __importDefault(require("../services/InformationExtractor"));
var lastScrapes = last_scrape_json_1.default;
var Scrapper = /** @class */ (function () {
    function Scrapper(_a) {
        var url = _a.url, ID = _a.ID, name = _a.name, is_api = _a.is_api, render_js = _a.render_js, api_method = _a.api_method;
        this.is_api = false;
        this.render_js = false;
        this.api_method = "GET";
        this.ID = ID;
        this.url = url;
        this.name = name;
        this.is_api = is_api;
        this.render_js = render_js != undefined ? render_js : false;
        this.api_method = api_method != undefined ? api_method : "GET";
    }
    Scrapper.prototype.scrape = function () {
        return __awaiter(this, void 0, void 0, function () {
            var needsRefresh, scrappedResults, jsonData, jsonData, HTMLDom, error_1, error_2, _i, scrappedResults_1, result, content_summary, isPlagiarism, summaryResult, extractedCompanies, extractedCrypto, err_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.needsRefresh()];
                    case 1:
                        needsRefresh = _a.sent();
                        if (!needsRefresh) {
                            this.logInfo("No need to refresh ".concat(this.name, " news"));
                            return [2 /*return*/, []];
                        }
                        this.logInfo("Scraping ".concat(this.name, "..."));
                        scrappedResults = [];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 14, , 15]);
                        if (!this.is_api) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getAPIData(this.url, this.api_method)];
                    case 3:
                        jsonData = _a.sent();
                        if (!jsonData) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.parseAPIData(jsonData)];
                    case 4:
                        scrappedResults = _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 13];
                    case 6:
                        if (!this.render_js) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.getHTMLDataWithJavascript(this.url)];
                    case 7:
                        jsonData = _a.sent();
                        if (!jsonData) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.parseHTMLData(jsonData)];
                    case 8:
                        scrappedResults = _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 13];
                    case 10: return [4 /*yield*/, this.getHTMLData(this.url)];
                    case 11:
                        HTMLDom = _a.sent();
                        if (!HTMLDom) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.parseHTMLData(HTMLDom)];
                    case 12:
                        scrappedResults = _a.sent();
                        _a.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_1 = _a.sent();
                        this.logInfo("Error while scraping ".concat(this.name, ": ").concat(error_1));
                        return [3 /*break*/, 15];
                    case 15:
                        this.logInfo("Scraping ".concat(this.name, " finished, start processing"));
                        lastScrapes.scrapes[this.ID] = new Date().getTime();
                        _a.label = 16;
                    case 16:
                        _a.trys.push([16, 18, , 19]);
                        return [4 /*yield*/, promises_1.default.writeFile("./src/last_scrape.json", JSON.stringify(lastScrapes, null, 2))];
                    case 17:
                        _a.sent();
                        return [3 /*break*/, 19];
                    case 18:
                        error_2 = _a.sent();
                        this.logInfo("Error while saving last scrape time: ".concat(error_2));
                        return [3 /*break*/, 19];
                    case 19:
                        _i = 0, scrappedResults_1 = scrappedResults;
                        _a.label = 20;
                    case 20:
                        if (!(_i < scrappedResults_1.length)) return [3 /*break*/, 31];
                        result = scrappedResults_1[_i];
                        content_summary = "";
                        isPlagiarism = false;
                        if (!result.content) return [3 /*break*/, 22];
                        this.logInfo("Sumarizing ".concat(result.title, "..."));
                        return [4 /*yield*/, SummaryNewsService_1.default.summarizeNews(result.title, result.content)];
                    case 21:
                        summaryResult = _a.sent();
                        content_summary = summaryResult.summary;
                        isPlagiarism = summaryResult.plagiarism;
                        _a.label = 22;
                    case 22:
                        extractedCompanies = [];
                        extractedCrypto = [];
                        _a.label = 23;
                    case 23:
                        _a.trys.push([23, 26, , 27]);
                        this.logInfo("Extracting Company information from: ".concat(this.shortName(result.title)));
                        return [4 /*yield*/, InformationExtractor_1.default.extrackStockNamesFromNews(result.title + " " + result.content)];
                    case 24:
                        extractedCompanies = _a.sent();
                        this.logInfo("Extracted Company information from: ".concat(this.shortName(result.title)));
                        this.logInfo("Extracting Crypto information from: ".concat(this.shortName(result.title)));
                        return [4 /*yield*/, InformationExtractor_1.default.extractCryptoCoinNamesFromNews(result.title + " " + result.content)];
                    case 25:
                        extractedCrypto = _a.sent();
                        this.logInfo("Extracted Crypto information from: ".concat(this.shortName(result.title)));
                        return [3 /*break*/, 27];
                    case 26:
                        err_1 = _a.sent();
                        this.logInfo("Error while extracting information from ".concat(this.name, " news: ").concat(err_1));
                        return [3 /*break*/, 27];
                    case 27:
                        _a.trys.push([27, 29, , 30]);
                        this.logInfo("Saving news: ".concat(this.shortName(result.title)));
                        return [4 /*yield*/, ScrappedNews_1.ScrappedNews.create(__assign(__assign({}, result), { content_summary: content_summary, isPlagiarism: isPlagiarism, from: this.ID, stockCompanies: extractedCompanies, cryptoAssets: extractedCrypto }))];
                    case 28:
                        _a.sent();
                        this.logInfo("Saved news: ".concat(this.shortName(result.title)));
                        return [3 /*break*/, 30];
                    case 29:
                        err_2 = _a.sent();
                        this.logInfo("Error while saving ".concat(this.name, " news: ").concat(err_2));
                        return [3 /*break*/, 30];
                    case 30:
                        _i++;
                        return [3 /*break*/, 20];
                    case 31:
                        this.logInfo("Processing finished");
                        return [2 /*return*/, scrappedResults];
                }
            });
        });
    };
    Scrapper.prototype.shortName = function (name) {
        return name.substring(0, 30) + "...";
    };
    Scrapper.prototype.hasURLOnDatabase = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ScrappedNews_1.ScrappedNews.exists({ url: url })];
                    case 1: return [2 /*return*/, (_a.sent()) != undefined];
                }
            });
        });
    };
    Scrapper.prototype.removeHTMLTags = function (text) {
        return text.replace(/<(.|\n)*?>/gi, "");
    };
    Scrapper.prototype.getAPIData = function (url, method) {
        return __awaiter(this, void 0, void 0, function () {
            var data, jsonData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url, {
                                method: method,
                            })];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, data.json()];
                    case 2:
                        jsonData = (_a.sent());
                        return [2 /*return*/, jsonData];
                    case 3:
                        error_3 = _a.sent();
                        this.logInfo("Error while getting API data from ".concat(this.name, ": ").concat(error_3));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.getHTMLData = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var data, htmlData, virtualConsole, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, cross_fetch_1.default)(url)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, data.text()];
                    case 2:
                        htmlData = _a.sent();
                        virtualConsole = new jsdom_1.VirtualConsole();
                        virtualConsole.on("error", function () { });
                        return [2 /*return*/, new jsdom_1.JSDOM(htmlData, { virtualConsole: virtualConsole }).window.document];
                    case 3:
                        error_4 = _a.sent();
                        this.logInfo("Error while getting HTML data from ".concat(this.name, ": ").concat(error_4));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Scrapper.prototype.getHTMLDataWithJavascript = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    Scrapper.prototype.needsRefresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var doc, lastScrapeValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ScrappedNews_1.ScrappedNews.findOne({ from: this.ID }).sort({ createdAt: -1 }).limit(1)];
                    case 1:
                        doc = _a.sent();
                        if (doc && doc.createdAt.getTime() + 1000 * 60 * 5 > new Date().getTime())
                            return [2 /*return*/, false];
                        lastScrapeValue = (last_scrape_json_1.default === null || last_scrape_json_1.default === void 0 ? void 0 : last_scrape_json_1.default.scrapes[this.ID]) || 0;
                        if (lastScrapeValue + 1000 * 60 * 5 > new Date().getTime())
                            return [2 /*return*/, false];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Scrapper.prototype.parseAPIData = function (data) {
        throw new Error("parseAPIData not implemented for ".concat(this.name, " scrapper"));
    };
    Scrapper.prototype.parseHTMLData = function (document) {
        throw new Error("parseHTMLData not implemented for ".concat(this.name, " scrapper"));
    };
    Scrapper.prototype.dontHaveOnList = function (object_name, object_index, link) {
        this.logInfo("Error while parsing HTML data from ".concat(this.name, " ").concat(object_name, " not found on list item: ").concat(object_index));
        this.logInfo("URL: ".concat(link ? link : this.url));
    };
    Scrapper.prototype.cleanupText = function (inputText) {
        var returnText = "" + inputText;
        //-- remove BR tags and replace them with line break
        returnText = returnText.replace(/<br>/gi, "\n");
        returnText = returnText.replace(/<br\s\/>/gi, "\n");
        returnText = returnText.replace(/<br\/>/gi, "\n");
        //-- remove P and A tags but preserve what's inside of them
        returnText = returnText.replace(/<p.*>/gi, "\n");
        returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");
        //-- remove all inside SCRIPT and STYLE tags
        returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
        returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
        //-- remove all else
        returnText = returnText.replace(/<(?:.|\s)*?>/g, "");
        //-- get rid of more than 2 multiple line breaks:
        returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");
        //-- get rid of more than 2 spaces:
        returnText = returnText.replace(/ +(?= )/g, "");
        //-- get rid of html-encoded characters:
        returnText = returnText.replace(/&nbsp;/gi, " ");
        returnText = returnText.replace(/&amp;/gi, "&");
        returnText = returnText.replace(/&quot;/gi, '"');
        returnText = returnText.replace(/&lt;/gi, "<");
        returnText = returnText.replace(/&gt;/gi, ">");
        return returnText;
    };
    Scrapper.prototype.logInfo = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.info("".concat(this.ID, ": ").concat(message));
    };
    return Scrapper;
}());
exports.default = Scrapper;
