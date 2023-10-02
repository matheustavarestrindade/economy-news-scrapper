import Scrapper, { ScrappeResult } from "../Scrapper";

class InfoMoneyScrapper extends Scrapper {
    constructor() {
        super({ ID: "InfoMoney", name: "InfoMoney", url: "https://www.infomoney.com.br/economia/", is_api: false });
    }

    protected async parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        const news_list = document.querySelector("body > div:nth-of-type(4) > div")?.querySelectorAll("article");
        if (!news_list) throw new Error(`Error while parsing HTML data from ${this.name}: News list not found`);

        let scrappedResults = [];

        for (let index = 0; index < news_list.length; index++) {
            const news = news_list[index];
            const link_element = news.querySelector("a");
            const link = link_element?.getAttribute("href");
            if (!link) {
                this.dontHaveOnList("link", index, link);
                continue;
            }

            const description = link_element?.getAttribute("title");
            if (!description) {
                this.dontHaveOnList("description", index, link);
                continue;
            }

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

    private async getNewsContent(url: string) {
        const document = await this.getHTMLData(url);
        if (!document) return null;
        const content = document.querySelector(".single__content");
        if (!content) return null;
        const paragraphs = content.querySelectorAll("p");
        if (!paragraphs) return null;
        let content_text: string[] = [];

        for (let index = 0; index < paragraphs.length; index++) {
            const paragraph = paragraphs[index];
            if (!paragraph || !paragraph.textContent) continue;
            content_text.push(this.cleanupText(paragraph.textContent));
        }
        return content_text.join("\n");
    }
}

export default InfoMoneyScrapper;
