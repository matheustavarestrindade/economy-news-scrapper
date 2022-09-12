import Scrapper, { ScrappeResult } from "../Scrapper";

class EstadaoScrapper extends Scrapper {
    constructor() {
        super({ ID: "Estadao", name: "Estadao", url: "https://economia.estadao.com.br/ultimas", is_api: false });
    }

    protected async parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        const news_list = document.querySelector(".lista")?.querySelectorAll(":scope > section");
        if (!news_list) throw new Error(`Error while parsing HTML data from ${this.name}: News list not found`);

        let scrappedResults = [];

        for (let index = 0; index < news_list.length; index++) {
            const news = news_list[index];
            const link_element = news.querySelector(".link-title");
            const link = link_element?.getAttribute("href");
            if (!link) {
                this.dontHaveOnList("link", index);
                continue;
            }

            const description = link_element?.getAttribute("title");
            if (!description) {
                this.dontHaveOnList("description", index);
                continue;
            }

            const img_element = news.querySelector("img");
            const img = img_element?.getAttribute("data-src-desktop");
            if (!img_element || !img) {
                this.dontHaveOnList("image", index);
                continue;
            }

            if (await this.hasURLOnDatabase(link)) continue;

            const content = await this.getNewsContent(link);

            if (!content) {
                this.dontHaveOnList("content", index);
                scrappedResults.push({
                    title: description,
                    url: link,
                    image: img,
                    content: "",
                } as ScrappeResult);
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

        const content1 = await this.content1(document);

        if (content1) return content1;

        return await this.content2(document);
    }

    private async content2(document: Document) {
        const content = document.querySelector(".content");
        if (!content) return null;
        const paragraphs = content.querySelectorAll("p");
        let content_text: string[] = [];

        for (let index = 0; index < paragraphs.length; index++) {
            const paragraph = paragraphs[index];
            let text = paragraph.textContent;
            if (!text) continue;
            text = this.cleanupText(text);
            content_text.push(text);
        }
        return content_text.join("\n");
    }

    private async content1(document: Document) {
        const content = document.querySelector(".news-body");
        if (!content) return null;

        const paragraphs = content.querySelectorAll("p");
        let content_text: string[] = [];

        for (let index = 0; index < paragraphs.length; index++) {
            const paragraph = paragraphs[index];
            let text = paragraph.textContent;
            if (!text) continue;
            text = this.cleanupText(text);
            content_text.push(text);
        }
        return content_text.join("\n");
    }
}

export default EstadaoScrapper;
