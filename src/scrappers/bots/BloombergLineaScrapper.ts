import Scrapper, { ScrappeResult } from "../Scrapper";

class BloombergLineaScrapper extends Scrapper {
    private readonly BASE_URL = "https://www.bloomberglinea.com.br";

    private static readonly QUERY = encodeURI(`{"feature":"nav-bar-content-/mercados","feedOffset":0,"feedSize":10,"includeSections":"/mercados"}`);
    private static readonly FILTER = encodeURI(`{content_elements{content_elements{content,type},headlines{basic},promo_items{basic{type,url}},type,canonical_url}}`);

    constructor() {
        super({
            ID: "BloombergLinea",
            name: "Bloomberg Linea",
            url: `https://www.bloomberglinea.com.br/pf/api/v3/content/fetch/story-feed-sections?query=${BloombergLineaScrapper.QUERY}&filter=${BloombergLineaScrapper.FILTER}`,
            is_api: true,
        });
    }

    protected async parseAPIData(data: any): Promise<ScrappeResult[]> {
        const content_elements = data["content_elements"];
        if (!content_elements) throw new Error(`Error while parsing API data from ${this.name}: content_elements not found`);

        let scrappedResults = [];

        for (let index = 0; index < content_elements.length; index++) {
            const news = content_elements[index];
            let link = news["canonical_url"];
            if (!link) {
                this.dontHaveOnList("link", index, link);
                continue;
            }
            link = this.BASE_URL + link;
            if (await this.hasURLOnDatabase(link)) continue;

            const description = news["headlines"]["basic"];
            if (!description) {
                this.dontHaveOnList("description", index, link);
                continue;
            }

            const img = news["promo_items"]["basic"]["url"];
            if (!img) {
                this.dontHaveOnList("image", index, link);
                continue;
            }

            const content = this.parseNewsContent(news["content_elements"]);

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

    private parseNewsContent(data: any[]) {
        let content = "";
        const breakPhrases = ["Leia também", "Leia também:", "Leia também "];

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (!element["content"]) continue;
            const elementContent = this.removeHTMLTags(element["content"]);
            if (breakPhrases.includes(elementContent)) break;
            content += elementContent;
            content += "\n";
        }
        return content;
    }
}

export default BloombergLineaScrapper;
