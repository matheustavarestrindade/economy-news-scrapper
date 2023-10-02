import { JSDOM, VirtualConsole } from "jsdom";
import fetch from "cross-fetch";
import { ScrappedNews } from "../database/documents/ScrappedNews";
import last_scrapes from "./../last_scrape.json";
import fs from "fs/promises";
import SummaryNewsService from "../services/SummaryNewsService";
import InformationExtractor from "../services/InformationExtractor";
import { Types } from "mongoose";
interface ScrapperProps {
    ID: string;
    name: string;
    url: string;
    is_api: boolean;
    render_js?: boolean;
    api_method?: "GET" | "POST";
}
interface LastScrapes {
    scrapes: {
        CNNBrasil: number;
        G1Globo: number;
        InfoMoney: number;
        UOLEconomia: number;
        Estadao: number;
        MoneyTimes: number;
        ExameEconomia: number;
    };
}

const lastScrapes: LastScrapes = last_scrapes;

export interface ScrappeResult {
    title: string;
    url?: string;
    image?: string;
    content?: string;
}

class Scrapper {
    protected ID: "CNNBrasil" | "G1Globo" | "InfoMoney" | "UOLEconomia" | "Estadao" | "MoneyTimes" | "ExameEconomia";
    protected url: string;
    protected name: string;
    protected is_api: boolean = false;
    protected render_js: boolean = false;
    protected api_method: "GET" | "POST" = "GET";

    constructor({ url, ID, name, is_api, render_js, api_method }: ScrapperProps) {
        this.ID = ID as "CNNBrasil" | "G1Globo" | "InfoMoney" | "UOLEconomia" | "Estadao" | "MoneyTimes" | "ExameEconomia";
        this.url = url;
        this.name = name;
        this.is_api = is_api;
        this.render_js = render_js != undefined ? render_js : false;
        this.api_method = api_method != undefined ? api_method : "GET";
    }

    public async scrape(): Promise<ScrappeResult[]> {
        const needsRefresh = await this.needsRefresh();
        if (!needsRefresh) {
            this.logInfo(`No need to refresh ${this.name} news`);
            return [];
        }
        this.logInfo(`Scraping ${this.name}...`);
        let scrappedResults: ScrappeResult[] = [];
        try {
            if (this.is_api) {
                const jsonData = await this.getAPIData(this.url, this.api_method);
                if (jsonData) scrappedResults = await this.parseAPIData(jsonData);
            } else if (this.render_js) {
                const jsonData = await this.getHTMLDataWithJavascript(this.url);
                if (jsonData) scrappedResults = await this.parseHTMLData(jsonData);
            } else {
                const HTMLDom = await this.getHTMLData(this.url);
                if (HTMLDom) scrappedResults = await this.parseHTMLData(HTMLDom);
            }
        } catch (error) {
            this.logInfo(`Error while scraping ${this.name}: ${error}`);
        }
        this.logInfo(`Scraping ${this.name} finished, start processing`);

        lastScrapes.scrapes[this.ID] = new Date().getTime();

        try {
            await fs.writeFile("./src/last_scrape.json", JSON.stringify(lastScrapes, null, 2));
        } catch (error) {
            this.logInfo(`Error while saving last scrape time: ${error}`);
        }

        for (const result of scrappedResults) {
            let content_summary = "";
            let isPlagiarism = false;
            if (result.content) {
                this.logInfo(`Sumarizing ${result.title}...`);
                const summaryResult = await SummaryNewsService.summarizeNews(result.title, result.content);
                content_summary = summaryResult.summary;
                isPlagiarism = summaryResult.plagiarism;
            }

            let extractedCompanies: Types.ObjectId[] = [];
            let extractedCrypto: Types.ObjectId[] = [];

            try {
                this.logInfo(`Extracting Company information from: ${this.shortName(result.title)}`);
                extractedCompanies = await InformationExtractor.extrackStockNamesFromNews(result.title + " " + result.content);
                this.logInfo(`Extracted Company information from: ${this.shortName(result.title)}`);
                this.logInfo(`Extracting Crypto information from: ${this.shortName(result.title)}`);
                extractedCrypto = await InformationExtractor.extractCryptoCoinNamesFromNews(result.title + " " + result.content);
                this.logInfo(`Extracted Crypto information from: ${this.shortName(result.title)}`);
            } catch (err) {
                this.logInfo(`Error while extracting information from ${this.name} news: ${err}`);
            }

            try {
                this.logInfo(`Saving news: ${this.shortName(result.title)}`);
                await ScrappedNews.create({
                    ...result,
                    content_summary,
                    isPlagiarism,
                    from: this.ID,
                    stockCompanies: extractedCompanies,
                    cryptoAssets: extractedCrypto,
                });
                this.logInfo(`Saved news: ${this.shortName(result.title)}`);
            } catch (err) {
                this.logInfo(`Error while saving ${this.name} news: ${err}`);
            }
        }

        this.logInfo(`Processing finished`);

        return scrappedResults;
    }

    protected shortName(name: string): string {
        return name.substring(0, 30) + "...";
    }

    protected async hasURLOnDatabase(url: string): Promise<boolean> {
        return (await ScrappedNews.exists({ url: url })) != undefined;
    }

    protected removeHTMLTags(text: string): string {
        return text.replace(/<(.|\n)*?>/gi, "");
    }

    protected async getAPIData(url: string, method: string): Promise<Object | void> {
        try {
            const data = await fetch(url, {
                method: method,
            });
            const jsonData = (await data.json()) as Object;
            return jsonData;
        } catch (error) {
            this.logInfo(`Error while getting API data from ${this.name}: ${error}`);
        }
    }

    protected async getHTMLData(url: string): Promise<Document | void> {
        try {
            const data = await fetch(url);
            const htmlData = await data.text();
            const virtualConsole = new VirtualConsole();
            virtualConsole.on("error", () => {});
            return new JSDOM(htmlData, { virtualConsole }).window.document;
        } catch (error) {
            this.logInfo(`Error while getting HTML data from ${this.name}: ${error}`);
        }
    }

    protected async getHTMLDataWithJavascript(url: string): Promise<Document | void> {
        //TODO: needs to implement puppeteer´
    }

    private async needsRefresh(): Promise<boolean> {
        const doc = await ScrappedNews.findOne({ from: this.ID }).sort({ createdAt: -1 }).limit(1);
        if (doc && doc.createdAt.getTime() + 1000 * 60 * 5 > new Date().getTime()) return false;
        const lastScrapeValue = (last_scrapes as any)?.scrapes[this.ID] || 0;
        if (lastScrapeValue + 1000 * 60 * 5 > new Date().getTime()) return false;
        return true;
    }

    protected parseAPIData(data: Object): Promise<ScrappeResult[]> {
        throw new Error(`parseAPIData not implemented for ${this.name} scrapper`);
    }

    protected parseHTMLData(document: Document): Promise<ScrappeResult[]> {
        throw new Error(`parseHTMLData not implemented for ${this.name} scrapper`);
    }

    protected dontHaveOnList(object_name: string, object_index: number, link: string | undefined | null) {
        this.logInfo(`Error while parsing HTML data from ${this.name} ${object_name} not found on list item: ${object_index}`);
        this.logInfo(`URL: ${link ? link : this.url}`);
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

    protected logInfo(message: string, ...optionalParams: any[]) {
        console.info(`${this.ID}: ${message}`);
    }
}

export default Scrapper;
