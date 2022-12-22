import { Router } from "express";
import { ScrappedNews } from "../../database/documents/ScrappedNews";

const route = Router();

route.get("/", async (req, res) => {
    const params = req.params as { page?: number };
    const page = params?.page != undefined ? params.page : 0;

    //Query latest news from database

    const news = await ScrappedNews.find({
        order: {
            createdAt: "DESC",
        },
    })
        .limit(10)
        .skip(page * 10);

    res.json(news);
});

export default route;
