import Scrapper, { ScrappeResult } from "../Scrapper";

class ExameEconomiaScrapper extends Scrapper {
    private base_url = "https://exame.com";
    constructor() {
        super({ ID: "ExameEconomia", name: "Exame Economia", url: "https://exame.com/noticias-sobre/economia-brasileira", is_api: false });
    }

    protected async parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        const news_items = document.querySelector("main > div > div:nth-of-type(3) > div")?.querySelectorAll(":scope > div");
        if (!news_items) throw new Error(`Error while parsing HTML data from ${this.name}: News Items not found`);

        let scrappedResults = [];

        for (let index = 0; index < news_items.length; index++) {
            const news_item = news_items[index];
            const link_element = news_item.querySelector("h2 a");
            const partial_link = link_element?.getAttribute("href");

            if (!partial_link) {
                this.dontHaveOnList("link", index);
                continue;
            }

            const description = link_element?.textContent;
            if (!description) {
                this.dontHaveOnList("description", index);
                continue;
            }

            const img_element = news_item.querySelector("noscript img");
            const img = img_element?.getAttribute("src");
            if (!img_element || !img) {
                this.dontHaveOnList("image", index);
                continue;
            }

            const link = partial_link.includes("http") ? partial_link : this.base_url + partial_link;

            if (await this.hasURLOnDatabase(link)) continue;

            const content = await this.getNewsContent(link);

            if (!content) {
                this.dontHaveOnList("content", index);
                continue;
            }
            scrappedResults.push({
                title: description,
                url: link,
                image: img,
                content: content,
            } as ScrappeResult);
        }

        return scrappedResults;
    }

    protected async getNewsContent(url: string): Promise<string | null> {
        const document = await this.getHTMLData(url);
        if (!document) return null;
        const paragraphs = document.getElementById("news-body")?.querySelectorAll("p");
        if (!paragraphs) return null;
        let content = [];

        for (let index = 0; index < paragraphs.length; index++) {
            const paragraph = paragraphs[index];
            let text = paragraph.textContent;
            if (!text) continue;
            if (text.includes("Veja também:")) break;
            text = this.cleanupText(text);
            content.push(text);
        }

        return content.join("\n");
    }
}

export default ExameEconomiaScrapper;
