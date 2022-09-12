import { JSDOM } from "jsdom";
import fetch from "cross-fetch";
import { ScrappedNews } from "../database/documents/ScrappedNews";

interface ScrapperProps {
    ID: string;
    name: string;
    url: string;
    is_api: boolean;
    render_js?: boolean;
    api_method?: "GET" | "POST";
}

export interface ScrappeResult {
    title: string;
    url?: string;
    image?: string;
    content?: string;
}

class Scrapper {
    protected ID: string;
    protected url: string;
    protected name: string;
    protected is_api: boolean = false;
    protected render_js: boolean = false;
    protected api_method: "GET" | "POST" = "GET";
    constructor({ url, ID, name, is_api, render_js, api_method }: ScrapperProps) {
        this.ID = ID;
        this.url = url;
        this.name = name;
        this.is_api = is_api;
        this.render_js = render_js != undefined ? render_js : false;
        this.api_method = api_method != undefined ? api_method : "GET";
        console.info(`Initializing ${this.name} scrapper`);
    }

    public async scrape(): Promise<ScrappeResult[]> {
        const needsRefresh = await this.needsRefresh();
        if (!needsRefresh) {
            console.info(`No need to refresh ${this.name} news`);
            return [];
        }
        console.info(`Scraping ${this.name}...`);
        let result: ScrappeResult[] = [];
        try {
            if (this.is_api) {
                const jsonData = await this.getAPIData(this.url, this.api_method);
                if (jsonData) result = await this.parseAPIData(jsonData);
            } else if (this.render_js) {
                const jsonData = await this.getHTMLDataWithJavascript(this.url);
                if (jsonData) result = await this.parseHTMLData(jsonData);
            } else {
                const HTMLDom = await this.getHTMLData(this.url);
                if (HTMLDom) result = await this.parseHTMLData(HTMLDom);
            }
        } catch (error) {
            console.error(`Error while scraping ${this.name}: ${error}`);
        }
        console.info(`Scraping ${this.name} finished`);
        console.info(`Saving ${result.length} news from ${this.name}...`);
        await ScrappedNews.insertMany(
            result.map((r) => {
                return {
                    ...r,
                    from: this.ID,
                };
            })
        );
        console.info(`Saving ${result.length} news from ${this.name} finished`);

        return result;
    }

    protected async hasURLOnDatabase(url: string): Promise<boolean> {
        return (await ScrappedNews.exists({ url: url })) != undefined;
    }

    protected async getAPIData(url: string, method: string): Promise<Object | void> {
        try {
            const data = await fetch(url, {
                method: method,
            });
            const jsonData = (await data.json()) as Object;
            return jsonData;
        } catch (error) {
            console.error(`Error while getting API data from ${this.name}: ${error}`);
        }
    }

    protected async getHTMLData(url: string): Promise<Document | void> {
        try {
            const data = await fetch(url);
            const htmlData = await data.text();
            return new JSDOM(htmlData).window.document;
        } catch (error) {
            console.error(`Error while getting HTML data from ${this.name}: ${error}`);
        }
    }

    protected async getHTMLDataWithJavascript(url: string): Promise<Document | void> {
        //TODO: needs to implement puppeteer´
    }

    private async needsRefresh(): Promise<boolean> {
        const doc = await ScrappedNews.findOne({ from: this.ID }).sort({ createdAt: -1 }).limit(1);
        if (!doc) return true;
        if (doc.createdAt.getTime() + 1000 * 60 * 5 < new Date().getTime()) return true;
        return false;
    }

    protected parseAPIData(data: Object): Promise<ScrappeResult[]> {
        throw new Error(`parseAPIData not implemented for ${this.name} scrapper`);
    }

    protected parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        throw new Error(`parseHTMLData not implemented for ${this.name} scrapper`);
    }

    protected dontHaveOnList(object_name: string, object_index: number) {
        console.warn(`Error while parsing HTML data from ${this.name} ${object_name} not found on list item: ${object_index}`);
    }

    protected cleanupText(inputText: string): string {
        var returnText = "" + inputText;

        //-- remove BR tags and replace them with line break
        returnText = returnText.replace(/<br>/gi, "\n");
        returnText = returnText.replace(/<br\s\/>/gi, "\n");
        returnText = returnText.replace(/<br\/>/gi, "\n");

        //-- remove P and A tags but preserve what's inside of them
        returnText = returnText.replace(/<p.*>/gi, "\n");
        returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

        //-- remove all inside SCRIPT and STYLE tags
        returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
        returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
        //-- remove all else
        returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

        //-- get rid of more than 2 multiple line breaks:
        returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

        //-- get rid of more than 2 spaces:
        returnText = returnText.replace(/ +(?= )/g, "");

        //-- get rid of html-encoded characters:
        returnText = returnText.replace(/&nbsp;/gi, " ");
        returnText = returnText.replace(/&amp;/gi, "&");
        returnText = returnText.replace(/&quot;/gi, '"');
        returnText = returnText.replace(/&lt;/gi, "<");
        returnText = returnText.replace(/&gt;/gi, ">");
        return returnText;
    }
}

export default Scrapper;
