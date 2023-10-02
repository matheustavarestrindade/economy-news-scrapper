"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockCompany = void 0;
var mongoose_1 = require("mongoose");
var StockCompanySchema = new mongoose_1.Schema({
    stock: { type: String, required: true, unique: true },
    shortName: { type: String, required: true },
    fullName: { type: String, required: false },
    market_cap: { type: Number, required: false },
    logo: { type: String, required: false },
    sector: { type: String, required: false },
}, { timestamps: true });
exports.StockCompany = (0, mongoose_1.model)("StockCompanies", StockCompanySchema);
