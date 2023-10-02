import { router, publicProcedure } from "../../TRPCProvider";
import * as z from "zod";
import { CryptoCoin } from "../../../database/documents/CryptoCoin";

const SearchCryptoInputSchema = z.object({
    query: z.string(),
});

export const CryptoRouter = router({
    search: publicProcedure.input(SearchCryptoInputSchema).query(async ({ input }) => {
        // Fuzzy search
        const keywords = input.query.split(" ");
        // Make query safe for regex
        const query = keywords.map((keyword) => keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).join("|");

        const cryptoCoins = await CryptoCoin.find({
            $or: [{ symbol: { $regex: query, $options: "i" } }, { name: { $regex: query, $options: "i" } }],
        }).limit(20);

        const formatedCrypto = cryptoCoins.map((coin) => ({
            symbol: coin.symbol,
            name: coin.name,
            logo: coin.image,
            id: coin._id,
        }));

        return formatedCrypto;
    }),
});
