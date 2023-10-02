import { router, publicProcedure } from "../../TRPCProvider";
import { ScrappedNews } from "../../../database/documents/ScrappedNews";
import * as zod from "zod";
import MilliTime from "../../../utils/MilliTime";

const NewsGetSchema = zod.object({
    cursor: zod.number().nullish(),
    query: zod
        .object({
            query: zod.string().optional(),
            startDate: zod
                .string()
                .transform((str) => new Date(str))
                .optional(),
            endDate: zod
                .string()
                .transform((str) => new Date(str))
                .optional(),
            selectedProviders: zod.array(zod.string()).optional(),
            selectedCompanies: zod.array(zod.string()).optional(),
            selectedCryptoCoins: zod.array(zod.string()).optional(),
        })
        .optional(),
});

export const NewsRouter = router({
    get: publicProcedure.input(NewsGetSchema).query(async ({ input }) => {
        const { cursor, query } = input;

        const SubscriberTime = Date.now() - MilliTime.MINUTE * 15;

        const hasQuery =
            query?.query ||
            query?.startDate ||
            query?.endDate ||
            (query?.selectedProviders && query.selectedProviders.length > 0) ||
            (query?.selectedCompanies && query.selectedCompanies.length > 0) ||
            (query?.selectedCryptoCoins && query.selectedCryptoCoins.length > 0);

        const filters = [];
        if (hasQuery) {
            if (query?.query)
                filters.push({
                    $or: [
                        { title: { $regex: query.query, $options: "i" } },
                        { content_summary: { $regex: query.query, $options: "i" } },
                        { from: { $regex: query.query, $options: "i" } },
                    ],
                });
            if (query?.startDate) filters.push({ createdAt: { $gte: query.startDate } });
            if (query?.endDate) filters.push({ createdAt: { $lte: query.endDate } });
            if (query?.selectedProviders && query.selectedProviders.length > 0) filters.push({ from: { $in: query.selectedProviders } });
            if (query?.selectedCompanies && query.selectedCompanies.length > 0) filters.push({ stockCompanies: { $in: query.selectedCompanies } });
            if (query?.selectedCryptoCoins && query.selectedCryptoCoins.length > 0) filters.push({ cryptoAssets: { $in: query.selectedCryptoCoins } });
        }

        const finalQuery = hasQuery ? { $and: filters } : {};

        console.log(query, JSON.stringify(finalQuery));

        const news = await ScrappedNews.find(finalQuery)
            .sort({ createdAt: -1 })
            .skip((cursor || 0) * 10)
            .limit(10);

        console.log(news.length);

        const formatedNews = news
            .map((news) => news.toJSON())
            .map((news) => {
                const isForSubscribers = news.createdAt.getTime() > SubscriberTime;
                return {
                    title: news.title,
                    content_summary: isForSubscribers ? "" : news.content_summary,
                    url: news.url,
                    image: news.image,
                    from: news.from,
                    date: news.createdAt,
                    only_subscribers: isForSubscribers,
                };
            });

        return { news: formatedNews, nextCursor: cursor ? cursor + 1 : 1 };
    }),
});
