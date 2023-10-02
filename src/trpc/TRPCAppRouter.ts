import { router } from "./TRPCProvider";
import { UserRouter } from "./routes/user/UserRouter";
import { NewsRouter } from "./routes/news/NewsRouter";
import { StocksRouter } from "./routes/stocks/StocksRouter";
import { CryptoRouter } from "./routes/crypto/CryptoRouter";

export const TRPCRouter = router({
    user: UserRouter,
    news: NewsRouter,
    stocks: StocksRouter,
    crypto: CryptoRouter,
});

export type TRPCRouterType = typeof TRPCRouter;
