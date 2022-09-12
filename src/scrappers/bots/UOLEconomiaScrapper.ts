import Scrapper, { ScrappeResult } from "../Scrapper";

class UOLEconomiaScrapper extends Scrapper {
    constructor() {
        super({ ID: "UOLEconomia", name: "UOL Economia", url: "https://economia.uol.com.br/noticias/", is_api: false });
    }

    protected async parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        const news_list = document.querySelector(".container .thumbnails .flex-wrap");
        if (!news_list) throw new Error(`Error while parsing HTML data from ${this.name}: News list not found`);
        const NEWS = news_list.querySelectorAll(":scope > div");
        if (!NEWS) throw new Error(`Error while parsing HTML data from ${this.name}: News not found`);

        let scrappedResults = [];

        for (let index = 0; index < NEWS.length; index++) {
            const news = NEWS[index];
            const link_element = news.querySelector("a");
            const link = link_element?.getAttribute("href");
            if (!link) {
                this.dontHaveOnList("link", index);
                continue;
            }
            let description = news.querySelector("h3")?.textContent;
            if (!description) {
                this.dontHaveOnList("description", index);
                continue;
            }
            description = this.cleanupText(description);
            const img_element = news.querySelector("img");
            const img = img_element?.getAttribute("src");
            if (!img_element || !img) {
                this.dontHaveOnList("image", index);
                continue;
            }

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

    private async getNewsContent(url: string) {
        const document = await this.getHTMLData(url);
        if (!document) return null;
        const content = document.querySelector(".text");
        if (!content) return null;
        const paragraphs = content?.querySelectorAll(":scope > p");
        if (!paragraphs) return null;

        let content_text: string[] = [];

        for (let index = 0; index < paragraphs.length; index++) {
            const paragraph = paragraphs[index];
            let text = paragraph.textContent;
            if (!text) continue;
            text = this.cleanupText(text);
            content_text.push(text);
        }

        const subscriber_text = content?.querySelector(".text-subscriber");
        const subscriber_paragraphs = subscriber_text?.querySelectorAll(":scope > p");
        if (!subscriber_paragraphs) return content_text.join("\n");

        for (let index = 0; index < subscriber_paragraphs.length; index++) {
            const element = subscriber_paragraphs[index];
            let text = element.textContent;
            if (!text) continue;
            text = this.cleanupText(text);
            content_text.push(text);
        }

        return content_text.join("\n");
    }
}

export default UOLEconomiaScrapper;
