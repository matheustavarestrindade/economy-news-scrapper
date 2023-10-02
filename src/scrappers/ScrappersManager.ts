import DateUtils from "../utils/DateUtils";
import BloombergLineaScrapper from "./bots/BloombergLineaScrapper";
import CNNBrasilScrapper from "./bots/CNNBrasilScrapper";
import EstadaoScrapper from "./bots/EstadaoScrapper";
import ExameEconomiaScrapper from "./bots/ExameEconomiaScrapper";
import G1GloboScrapper from "./bots/G1GloboScrapper";
import InfoMoneyScrapper from "./bots/InfoMoneyScrapper";
import MoneyTimesScrapper from "./bots/MoneyTimesScrapper";
import UOLEconomiaScrapper from "./bots/UOLEconomiaScrapper";
import Scrapper from "./Scrapper";

class ScrappersManager {
    private scrappers: Scrapper[] = [];
    private UPDATE_DELAY = 1000 * 60 * 3; // 3 minutes
    constructor() {
        this.scrappers.push(new MoneyTimesScrapper());
        this.scrappers.push(new CNNBrasilScrapper());
        this.scrappers.push(new G1GloboScrapper());
        this.scrappers.push(new InfoMoneyScrapper());
        this.scrappers.push(new UOLEconomiaScrapper());
        this.scrappers.push(new EstadaoScrapper());
        this.scrappers.push(new ExameEconomiaScrapper());
        this.scrappers.push(new BloombergLineaScrapper());
    }

    public async start(): Promise<void> {
        const scrappersToWait = [];
        for (const scrapper of this.scrappers) {
            scrappersToWait.push(scrapper.scrape());
        }
        console.log(`Starting scrape time: ${DateUtils.getFormattedDateStringWithHoursAndMinutes(new Date())}`);
        await Promise.all(scrappersToWait);
        console.log(`Finished scrape time: ${DateUtils.getFormattedDateStringWithHoursAndMinutes(new Date())}`);
        setTimeout(() => this.start(), this.UPDATE_DELAY);
    }
}

export default ScrappersManager;
