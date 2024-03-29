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
var BloombergLineaScrapper = /** @class */ (function (_super) {
    __extends(BloombergLineaScrapper, _super);
    function BloombergLineaScrapper() {
        var _this = _super.call(this, {
            ID: "BloombergLinea",
            name: "Bloomberg Linea",
            url: "https://www.bloomberglinea.com.br/pf/api/v3/content/fetch/story-feed-sections?query=".concat(BloombergLineaScrapper.QUERY, "&filter=").concat(BloombergLineaScrapper.FILTER),
            is_api: true,
        }) || this;
        _this.BASE_URL = "https://www.bloomberglinea.com.br";
        return _this;
    }
    BloombergLineaScrapper.prototype.parseAPIData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var content_elements, scrappedResults, index, news, link, description, img, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content_elements = data["content_elements"];
                        if (!content_elements)
                            throw new Error("Error while parsing API data from ".concat(this.name, ": content_elements not found"));
                        scrappedResults = [];
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < content_elements.length)) return [3 /*break*/, 4];
                        news = content_elements[index];
                        link = news["canonical_url"];
                        if (!link) {
                            this.dontHaveOnList("link", index, link);
                            return [3 /*break*/, 3];
                        }
                        link = this.BASE_URL + link;
                        return [4 /*yield*/, this.hasURLOnDatabase(link)];
                    case 2:
                        if (_a.sent())
                            return [3 /*break*/, 3];
                        description = news["headlines"]["basic"];
                        if (!description) {
                            this.dontHaveOnList("description", index, link);
                            return [3 /*break*/, 3];
                        }
                        img = news["promo_items"]["basic"]["url"];
                        if (!img) {
                            this.dontHaveOnList("image", index, link);
                            return [3 /*break*/, 3];
                        }
                        content = this.parseNewsContent(news["content_elements"]);
                        if (!content) {
                            this.dontHaveOnList("content", index, link);
                            return [3 /*break*/, 3];
                        }
                        scrappedResults.push({
                            title: description,
                            url: link,
                            image: img,
                            content: content,
                        });
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, scrappedResults];
                }
            });
        });
    };
    BloombergLineaScrapper.prototype.parseNewsContent = function (data) {
        var content = "";
        var breakPhrases = ["Leia também", "Leia também:", "Leia também "];
        for (var index = 0; index < data.length; index++) {
            var element = data[index];
            if (!element["content"])
                continue;
            var elementContent = this.removeHTMLTags(element["content"]);
            if (breakPhrases.includes(elementContent))
                break;
            content += elementContent;
            content += "\n";
        }
        return content;
    };
    BloombergLineaScrapper.QUERY = encodeURI("{\"feature\":\"nav-bar-content-/mercados\",\"feedOffset\":0,\"feedSize\":10,\"includeSections\":\"/mercados\"}");
    BloombergLineaScrapper.FILTER = encodeURI("{content_elements{content_elements{content,type},headlines{basic},promo_items{basic{type,url}},type,canonical_url}}");
    return BloombergLineaScrapper;
}(Scrapper_1.default));
exports.default = BloombergLineaScrapper;
