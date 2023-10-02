import Scrapper, { ScrappeResult } from "../Scrapper";

class G1GloboScrapper extends Scrapper {
    constructor() {
        super({ ID: "G1Globo", name: "G1 Globo", url: "https://g1.globo.com/economia/", is_api: false });
    }

    protected async parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        const news_list = document.querySelector("main > div:nth-of-type(4) > div:nth-of-type(2) > div > div > div > div > div > div > div > div:nth-of-type(2) > div > div > div");
        if (!news_list) throw new Error(`Error while parsing HTML data from ${this.name}: News list not found`);
        const NEWS = news_list.querySelectorAll(":scope > div");
        if (!NEWS) throw new Error(`Error while parsing HTML data from ${this.name}: News not found`);

        let scrappedResults = [];

        for (let index = 0; index < NEWS.length; index++) {
            const news = NEWS[index];
            const link_element = news.querySelector("a");
            const link = link_element?.getAttribute("href");
            if (!link) {
                this.dontHaveOnList("link", index, link);
                continue;
            }
            const description = link_element?.innerHTML;
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
        const content = document.querySelectorAll(".content-text__container");
        if (!content) return null;
        let content_text: string[] = [];
        for (let index = 0; index < content.length; index++) {
            const paragraph = content[index];
            if (!paragraph || !paragraph.textContent) continue;
            content_text.push(this.cleanupText(paragraph.textContent));
        }
        return content_text.join("\n");
    }
}

export default G1GloboScrapper;
