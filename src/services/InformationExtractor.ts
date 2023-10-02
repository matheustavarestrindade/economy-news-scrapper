import { Types } from "mongoose";
import { CryptoCoin } from "../database/documents/CryptoCoin";
import { StockCompany } from "../database/documents/StockCompany";

class InformationExtractor {
    public static async extrackStockNamesFromNews(news: string): Promise<Types.ObjectId[]> {
        const stockCompanies = await StockCompany.find();
        const foundStocks: Types.ObjectId[] = [];

        for (const stock of stockCompanies) {
            const regex = new RegExp(`\\b${stock.stock}\\b`, "gi");
            if (regex.test(news)) {
                foundStocks.push(stock._id);
                continue;
            }
            // const regex2 = new RegExp(`\\b${stock.shortName}\\b`, "gi");
            // if (regex2.test(news)) {
            //     foundStocks.push(stock._id);
            //     continue;
            // }
            const regex3 = new RegExp(`\\b${stock.fullName}\\b`, "gi");
            if (regex3.test(news)) {
                foundStocks.push(stock._id);
                continue;
            }
        }

        return foundStocks;
    }

    public static async extractCryptoCoinNamesFromNews(news: string): Promise<Types.ObjectId[]> {
        const coins = await CryptoCoin.find();
        const foundCoins: Types.ObjectId[] = [];

        for (const coin of coins) {
            const regex = new RegExp(`\\b${coin.name}\\b`, "gi");
            if (regex.test(news)) {
                foundCoins.push(coin._id);
                continue;
            }
            const regex2 = new RegExp(`\\b${coin.symbol}\\b`, "gi");
            if (regex2.test(news)) {
                foundCoins.push(coin._id);
                continue;
            }
        }
        return foundCoins;
    }
}

export default InformationExtractor;
