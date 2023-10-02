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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var string_similarity_js_1 = require("string-similarity-js");
var OpenAIService_1 = __importDefault(require("./OpenAIService"));
var SummaryNewsService = /** @class */ (function () {
    function SummaryNewsService() {
    }
    SummaryNewsService.summarizeNews = function (title, news) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var prompt, response, summaryGeneratedWithChatGPT;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        prompt = this.SUMMARIZE_NEWS_PROMPT.replace("{{title}}", title).replace("{{content}}", news);
                        return [4 /*yield*/, OpenAIService_1.default.getCompletion(prompt)];
                    case 1:
                        response = _c.sent();
                        if (!response || !((_a = response.message) === null || _a === void 0 ? void 0 : _a.content))
                            return [2 /*return*/, {
                                    summary: "",
                                    plagiarism: false,
                                }];
                        summaryGeneratedWithChatGPT = (_b = response.message) === null || _b === void 0 ? void 0 : _b.content;
                        return [2 /*return*/, {
                                summary: summaryGeneratedWithChatGPT,
                                plagiarism: this.isPlagiarism(summaryGeneratedWithChatGPT, news, title),
                            }];
                }
            });
        });
    };
    SummaryNewsService.isPlagiarism = function (summary, news, title) {
        var similarity = (0, string_similarity_js_1.stringSimilarity)(summary, news);
        var isPlagiarism = similarity > this.SUMMARIZE_NEWS_THRESHOLD;
        if (isPlagiarism)
            console.log("Summarized news: ".concat(title, " is plagiarism"), {
                similarity: similarity,
            });
        return isPlagiarism;
    };
    SummaryNewsService.SUMMARIZE_NEWS_THRESHOLD = 0.7;
    SummaryNewsService.SUMMARIZE_NEWS_PROMPT = "\n        A not\u00EDcia abaixo e util em alguns pontos para investidores do mercado de a\u00E7\u00F5es.\n        Escreva um sum\u00E1rio extraindo informa\u00E7\u00F5es que sejam uteis para investidores.\n        O Sum\u00E1rio deve ser feito sobre a not\u00EDcia abaixo em bullet points.\n        T\u00EDtulo: {{title}}\n        Not\u00EDcia:\n        {{content}}\n    ";
    return SummaryNewsService;
}());
exports.default = SummaryNewsService;
