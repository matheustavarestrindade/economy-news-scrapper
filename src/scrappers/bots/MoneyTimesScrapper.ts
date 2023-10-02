import Scrapper, { ScrappeResult } from "../Scrapper";

class MoneyTimesScrapper extends Scrapper {
    constructor() {
        super({ ID: "MoneyTimes", name: "MoneyTimes", url: "https://www.moneytimes.com.br/tag/economia/", is_api: false });
    }

    protected async parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        const news_list = document.querySelector(".news-list")?.querySelectorAll(":scope > div");
        if (!news_list) throw new Error(`Error while parsing HTML data from ${this.name}: News list not found`);

        let scrappedResults: ScrappeResult[] = [];

        for (let index = 0; index < news_list.length; index++) {
            const news = news_list[index];
            if (news.classList.contains("news-item--ad")) continue;
            const link_element = news.querySelector("a");
            const link = link_element?.getAttribute("href");
            if (!link) {
                this.dontHaveOnList("link", index, link);
                continue;
            }

            let description = news?.querySelector("h2")?.textContent;
            if (!description) {
                this.dontHaveOnList("description", index, link);
                continue;
            }
            description = this.cleanupText(description);

            const img_element = news.querySelector("img");
            const img = img_element?.getAttribute("src");
            if (!img_element || !img) {
                this.dontHaveOnList("image", index, link);
            }

            if (await this.hasURLOnDatabase(link)) continue;

            const content = await this.getNewsContent(link);

            if (!content) {
                this.dontHaveOnList("content", index, link);
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
        const content = document.querySelector(".single__text");
        if (!content) {
            this.logInfo("No content found on url: " + url);
            return null;
        }
        const paragraphs = content.querySelectorAll("p");

        let text_content = [];

        for (let index = 0; index < paragraphs.length; index++) {
            const paragraph = paragraphs[index];
            const text = paragraph.textContent;
            if (!text) continue;
            if (text.includes("Siga o Money Times no Instagram!")) break;
            text_content.push(this.cleanupText(text));
        }

        return text_content.join("\n");
    }
}

export default MoneyTimesScrapper;
