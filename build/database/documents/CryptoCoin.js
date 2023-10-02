"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoCoin = void 0;
var mongoose_1 = require("mongoose");
var CryptoCoinSchema = new mongoose_1.Schema({
    coinGeckoId: { type: String, required: true, unique: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    current_price: { type: Number, required: true },
    market_cap: { type: Number, required: true },
    market_cap_rank: { type: Number, required: true },
    fully_diluted_valuation: { type: Number, required: true },
    total_volume: { type: Number, required: true },
    high_24h: { type: Number, required: true },
    low_24h: { type: Number, required: true },
    price_change_24h: { type: Number, required: true },
    price_change_percentage_24h: { type: Number, required: true },
    market_cap_change_24h: { type: Number, required: true },
    market_cap_change_percentage_24h: { type: Number, required: true },
    circulating_supply: { type: Number, required: true },
    total_supply: { type: Number, required: true },
    max_supply: { type: Number, required: true },
    ath: { type: Number, required: true },
    ath_change_percentage: { type: Number, required: true },
    ath_date: { type: String, required: true },
    atl: { type: Number, required: true },
    atl_change_percentage: { type: Number, required: true },
    atl_date: { type: String, required: true },
    roi: { type: Object },
    last_updated: { type: String, required: true },
}, { timestamps: true });
exports.CryptoCoin = (0, mongoose_1.model)("CryptoCoins", CryptoCoinSchema);
