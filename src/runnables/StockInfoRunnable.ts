import MilliTime from "../utils/MilliTime";
import TaskRepeatingRunnable from "./TaskRepeatingRunnable";
import { StockCompany } from "../database/documents/StockCompany";
import StockMarketAPIService from "../services/StockMarketAPIService";
import Debug from "../utils/Debug";
import ImageDownloader from "../services/ImageDownloader";
class StockInfoRunnable extends TaskRepeatingRunnable {
    constructor() {
        super(0, MilliTime.MINUTE * 10); // 10 minutes
    }

    public async run(): Promise<void> {
        if (!(await this.needsUpdate())) return;
        const stocks = await StockMarketAPIService.queryStocksInfo();
        if (!stocks) {
            Debug.warn("Could not fetch stocks from BRAPI");
            return;
        }

        const stockSymbols = stocks.map((stock) => stock.stock);
        // Split into chunks of 20 stocks
        const stockChunks = stockSymbols.reduce<string[][]>((acc, stock) => {
            if (acc.length === 0) {
                acc.push([stock]);
            } else {
                const lastChunk = acc[acc.length - 1];
                if (lastChunk.length === 20) {
                    acc.push([stock]);
                } else {
                    lastChunk.push(stock);
                }
            }
            return acc;
        }, []);

        const stockQuotes = await Promise.all(stockChunks.map((chunk) => StockMarketAPIService.queryStockQuote(chunk.join(","))));

        for (const stockQuoteChunk of stockQuotes) {
            for (const stockQuote of stockQuoteChunk) {
                const stock = stocks.find((stock) => stock.stock === stockQuote.symbol);
                const stockFromDatabse = await StockCompany.findOne({ stock: stockQuote.symbol });
                if (!stock) continue;
                try {
                    if (!stockFromDatabse?.logo) Debug.info(`Logo of stock ${stock.stock} don't exists, downloading...`);
                    const base64Logo = stockFromDatabse?.logo ? stockFromDatabse.logo : stock.logo ? await ImageDownloader.downloadImageAsBase64(stock.logo) : null;

                    await StockCompany.updateOne(
                        { stock: stock.stock },
                        {
                            stock: stock.stock,
                            shortName: stock.name,
                            market_cap: stock.market_cap,
                            logo: base64Logo,
                            sector: stock.sector,
                            fullName: stockQuote.longName,
                        },
                        { upsert: true }
                    );
                } catch (e) {
                    Debug.error(`Error downloading logo of stock ${stock.stock}: ${e}`);
                    continue;
                }
            }
        }

        Debug.info("Updated stocks");
    }

    private async needsUpdate() {
        const lastStock = await StockCompany.findOne({}).sort({ lastUpdate: -1 }).limit(1);
        if (lastStock && lastStock.updatedAt.getTime() > new Date().getTime() - MilliTime.MINUTE * 10) {
            return false;
        }
        return true;
    }
}

export default StockInfoRunnable;
