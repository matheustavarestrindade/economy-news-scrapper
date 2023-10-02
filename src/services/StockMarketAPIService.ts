class StockMarketAPIService {
    private static readonly BRAPI_QUOTE_LIST_URL = "https://brapi.dev/api/quote/list";
    private static readonly BRAPI_QUOTE_TICKERS_URL = "https://brapi.dev/api/quote";

    public static async queryStocksInfo(): Promise<StockInfo[]> {
        try {
            const data = await fetch(this.BRAPI_QUOTE_LIST_URL);
            if (!data.ok) return [];
            const json = await data.json();
            if (!("stocks" in json)) return [];
            const stocks = json["stocks"];
            if (!Array.isArray(stocks)) return [];
            return stocks as StockInfo[];
        } catch (e) {
            console.error(`Error interacting with BRAPI on URL ${this.BRAPI_QUOTE_LIST_URL}: ${e} `);
            return [];
        }
    }

    public static async queryStockQuote(stocks: string): Promise<StockQuoteInfo[]> {
        try {
            const data = await fetch(`${this.BRAPI_QUOTE_TICKERS_URL}/${stocks}`);
            if (!data.ok) return [];
            const json = await data.json();
            if (!("results" in json)) return [];
            const results = json["results"];
            if (!Array.isArray(results)) return [];
            return results as StockQuoteInfo[];
        } catch (e) {
            console.error(`Error interacting with BRAPI on URL ${this.BRAPI_QUOTE_TICKERS_URL}: ${e} `);
            return [];
        }
    }
}

interface StockQuoteInfo {
    symbol: string;
    shortName: string;
    longName: string;
    currency: string;
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    regularMarketDayRange: string;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketTime: string;
    marketCap?: number;
    regularMarketVolume: number;
    regularMarketPreviousClose: number;
    regularMarketOpen: number;
    averageDailyVolume10Day: number;
    averageDailyVolume3Month: number;
    fiftyTwoWeekLowChange: number;
    fiftyTwoWeekLowChangePercent: number;
    fiftyTwoWeekRange: string;
    fiftyTwoWeekHighChange: number;
    fiftyTwoWeekHighChangePercent: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    twoHundredDayAverage: number;
    twoHundredDayAverageChange: number;
    twoHundredDayAverageChangePercent: number;
}

interface StockInfo {
    stock: string;
    name: string;
    close: number;
    change: number;
    volume: number;
    market_cap: number | null;
    logo: string | null;
    sector: string | null;
}

export default StockMarketAPIService;
