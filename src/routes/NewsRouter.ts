import { Router } from 'express';
import { ScrappedNews } from '../database/documents/ScrappedNews';
import { SubscriberTime } from '../utils/Constants';

const router = Router();

router.get('/', async (req, res) => {
    const query = req.query;

    let { startDate, endDate, selectedProviders, selectedCompanies, selectedCryptoCoins, searchStr, cursor} = query;

    const skip = cursor ? parseInt(cursor as string) * 10 : 0;

    selectedCompanies = selectedCompanies?.toString().split(",") || [];
    selectedProviders = selectedProviders?.toString().split(",") || [];
    selectedCryptoCoins = selectedCryptoCoins?.toString().split(",") || [];

    const filters = []

    if (searchStr)
        filters.push({
            $or: [
                { title: { $regex: searchStr, $options: "i" } },
                { content_summary: { $regex: searchStr, $options: "i" } },
                { from: { $regex: searchStr, $options: "i" } },
            ],
        });
    if (startDate) filters.push({ createdAt: { $gte: startDate } });
    if (endDate) filters.push({ createdAt: { $lte: endDate } });
    if (selectedProviders && selectedProviders.length > 0) filters.push({ from: { $in: selectedProviders } });
    if (selectedCompanies && selectedCompanies.length > 0) filters.push({ stockCompanies: { $in: selectedCompanies } });
    if (selectedCryptoCoins && selectedCryptoCoins.length > 0) filters.push({ cryptoAssets: { $in: selectedCryptoCoins } });



    const news = await ScrappedNews.find(filters.length > 0 ? { $and: filters } : {})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(10);


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

    res.json({ news: formatedNews, nextCursor: cursor ? parseInt(cursor as string) + 1 : 1 });
})

export default router;


