import { CryptoCoin } from "../database/documents/CryptoCoin";
import MilliTime from "../utils/MilliTime";
import TaskRepeatingRunnable from "./TaskRepeatingRunnable";
import CoinGeckoAPIService from "../services/CoinGeckoAPIService";
import Debug from "../utils/Debug";

class CryptoInfoRunnable extends TaskRepeatingRunnable {
    constructor() {
        super(0, MilliTime.MINUTE * 5); // 5 Minutes
    }

    public async run() {
        const latestUpdate = await CryptoCoin.findOne().sort({ createdAt: -1 });

        const topCoins = await CoinGeckoAPIService.getTop100Coins();
        if (!topCoins) {
            Debug.warn("Could not fetch top coins from CoinGecko API");
            return;
        }

        for (const coin of topCoins) {
            const { id: coinGeckoId, ...coinInfo } = coin;
            await CryptoCoin.updateOne(
                { coinGeckoId },
                {
                    coinGeckoId,
                    ...coinInfo,
                },
                { upsert: true }
            );
        }
    }
}

export default CryptoInfoRunnable;
