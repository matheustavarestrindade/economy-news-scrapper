"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrappedNews = void 0;
var mongoose_1 = require("mongoose");
var ScrappedNewsSchema = new mongoose_1.Schema({
    url: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: false },
    content: { type: String, required: true },
    content_summary: { type: String, required: false },
    isPlagiarism: { type: Boolean, required: false },
    stockCompanies: [{ type: mongoose_1.Types.ObjectId, ref: "StockCompany" }],
    cryptoAssets: [{ type: mongoose_1.Types.ObjectId, ref: "CryptoCoin" }],
}, { timestamps: true });
exports.ScrappedNews = (0, mongoose_1.model)("ScrappedNews", ScrappedNewsSchema);
