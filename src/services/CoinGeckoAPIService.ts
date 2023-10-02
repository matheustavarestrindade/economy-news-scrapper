class CoinGeckoAPIService {
    private static readonly COIN_LIST_URL = "https://api.coingecko.com/api/v3/coins/list";
    private static readonly COIN_INFO_URL = "https://api.coingecko.com/api/v3/coins/{{coin}}";
    private static readonly COIN_TOP100_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

    public static async listCoins(): Promise<CoinList[]> {
        const data = await fetch(this.COIN_LIST_URL);
        if (!data.ok) return [];
        const json = await data.json();
        if (!Array.isArray(json)) return [];
        return json as CoinList[];
    }

    public static async getCoinInfo(coin: string): Promise<CoinInfo | null> {
        const data = await fetch(this.COIN_INFO_URL.replace("{{coin}}", coin));
        if (!data.ok) return null;
        const json = await data.json();
        return json as CoinInfo;
    }

    public static async getTop100Coins(): Promise<TopCoin[]> {
        const coins = await fetch(this.COIN_TOP100_URL);
        if (!coins.ok) return [];
        const json = await coins.json();
        if (!Array.isArray(json)) return [];
        return json as TopCoin[];
    }
}

interface TopCoin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: any;
    last_updated: string;
}

interface CoinInfo {
    id: string;
    symbol: string;
    name: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
}

interface CoinList {
    id: string;
    symbol: string;
    name: string;
}

export default CoinGeckoAPIService;
