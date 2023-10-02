import Scrapper, { ScrappeResult } from "../Scrapper";

class CNNBrasilScrapper extends Scrapper {
    constructor() {
        super({ ID: "CNNBrasil", name: "CNN Brasil", url: "https://www.cnnbrasil.com.br/tudo-sobre/economia/", is_api: false });
    }

    protected async parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        const news_list = document.querySelector("main > div > div > ul");
        if (!news_list) throw new Error(`Error while parsing HTML data from ${this.name}: News list not found`);
        const NEWS = news_list.querySelectorAll("li");
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
            const img_element = news.querySelector("img");
            const img = img_element?.getAttribute("src");
            if (!img_element || !img) {
                this.dontHaveOnList("image", index, link);
                continue;
            }
            const description = img_element?.getAttribute("title");
            if (!description) {
                this.dontHaveOnList("description", index, link);
                continue;
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
        return Promise.resolve(scrappedResults);
    }

    protected async getNewsContent(url: string) {
        const document = await this.getHTMLData(url);
        if (!document) return null;
        const content = document.querySelector(".post__content");
        if (!content) return null;
        const paragraphs = content.querySelectorAll("p");
        if (!paragraphs) return null;
        let content_text: string[] = [];
        for (let index = 0; index < paragraphs.length; index++) {
            const paragraph = paragraphs[index];
            if (!paragraph.textContent) continue;
            content_text.push(this.cleanupText(paragraph.textContent));
        }
        return content_text.join("\n");
    }
}

export default CNNBrasilScrapper;
