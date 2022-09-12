import Scrapper, { ScrappeResult } from "../Scrapper";

class R7EconomiaScrapper extends Scrapper {
    constructor() {
        super({ ID: "R7Economia", name: "R7 Economia", url: "https://noticias.r7.com/economia", is_api: false });
    }

    protected async parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        const htmlContent = document.documentElement.outerHTML;
        if (!htmlContent) throw new Error(`Error while parsing HTML data from ${this.name}: HTML content not found`);
        const matchURL = /urlArticle: '(.+)page=1'/g.exec(htmlContent);

        console.log(matchURL?.[1]);
        return [];
    }
}

export default R7EconomiaScrapper;
