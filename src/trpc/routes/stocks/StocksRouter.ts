import { router, publicProcedure } from "../../TRPCProvider";
import * as z from "zod";
import { StockCompany } from "../../../database/documents/StockCompany";

const SearchStockInputSchema = z.object({
    query: z.string(),
});

export const StocksRouter = router({
    search: publicProcedure.input(SearchStockInputSchema).query(async ({ input }) => {
        // Fuzzy search
        const keywords = input.query.split(" ");
        // Make query safe for regex
        const query = keywords.map((keyword) => keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).join("|");

        const stocks = await StockCompany.find({
            $or: [{ stock: { $regex: query, $options: "i" } }, { shortName: { $regex: query, $options: "i" } }, { fullName: { $regex: query, $options: "i" } }],
        }).limit(20);

        const formatedStocks = stocks.map((stock) => ({
            stock: stock.stock,
            shortName: stock.shortName,
            fullName: stock.fullName,
            logo: "data:image/svg+xml;base64," + stock.logo,
            sector: stock.sector,
            id: stock._id,
        }));

        return formatedStocks;
    }),
});
