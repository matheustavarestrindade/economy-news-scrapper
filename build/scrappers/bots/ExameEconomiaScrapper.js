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
var Scrapper_1 = __importDefault(require("../Scrapper"));
var ExameEconomiaScrapper = /** @class */ (function (_super) {
    __extends(ExameEconomiaScrapper, _super);
    function ExameEconomiaScrapper() {
        var _this = _super.call(this, { ID: "ExameEconomia", name: "Exame Economia", url: "https://exame.com/noticias-sobre/economia-brasileira", is_api: false }) || this;
        _this.base_url = "https://exame.com";
        return _this;
    }
    ExameEconomiaScrapper.prototype.parseHTMLData = function (document) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var news_items, scrappedResults, index, news_item, link_element, partial_link, link, description, img_element, img, content;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        news_items = (_a = document.querySelector("main > div > div:nth-of-type(3) > div")) === null || _a === void 0 ? void 0 : _a.querySelectorAll(":scope > div");
                        if (!news_items)
                            throw new Error("Error while parsing HTML data from ".concat(this.name, ": News Items not found"));
                        scrappedResults = [];
                        index = 0;
                        _b.label = 1;
                    case 1:
                        if (!(index < news_items.length)) return [3 /*break*/, 5];
                        news_item = news_items[index];
                        link_element = news_item.querySelector("h2 a");
                        partial_link = link_element === null || link_element === void 0 ? void 0 : link_element.getAttribute("href");
                        if (!partial_link) {
                            this.dontHaveOnList("link", index, undefined);
                            return [3 /*break*/, 4];
                        }
                        link = partial_link.includes("http") ? partial_link : this.base_url + partial_link;
                        description = link_element === null || link_element === void 0 ? void 0 : link_element.textContent;
                        if (!description) {
                            this.dontHaveOnList("description", index, link);
                            return [3 /*break*/, 4];
                        }
                        img_element = news_item.querySelector("noscript img");
                        img = img_element === null || img_element === void 0 ? void 0 : img_element.getAttribute("src");
                        if (!img_element || !img) {
                            this.dontHaveOnList("image", index, link);
                        }
                        return [4 /*yield*/, this.hasURLOnDatabase(link)];
                    case 2:
                        if (_b.sent())
                            return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getNewsContent(link)];
                    case 3:
                        content = _b.sent();
                        if (!content) {
                            this.dontHaveOnList("content", index, link);
                            return [3 /*break*/, 4];
                        }
                        scrappedResults.push({
                            title: description,
                            url: link,
                            image: img,
                            content: content,
                        });
                        _b.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, scrappedResults];
                }
            });
        });
    };
    ExameEconomiaScrapper.prototype.getNewsContent = function (url) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var document, paragraphs, content, index, paragraph, text;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getHTMLData(url)];
                    case 1:
                        document = _b.sent();
                        if (!document)
                            return [2 /*return*/, null];
                        paragraphs = (_a = document.getElementById("news-body")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("p");
                        if (!paragraphs)
                            return [2 /*return*/, null];
                        content = [];
                        for (index = 0; index < paragraphs.length; index++) {
                            paragraph = paragraphs[index];
                            text = paragraph.textContent;
                            if (!text)
                                continue;
                            if (text.includes("Veja também:"))
                                break;
                            text = this.cleanupText(text);
                            content.push(text);
                        }
                        return [2 /*return*/, content.join("\n")];
                }
            });
        });
    };
    return ExameEconomiaScrapper;
}(Scrapper_1.default));
exports.default = ExameEconomiaScrapper;
