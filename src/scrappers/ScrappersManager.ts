import CNNBrasilScrapper from "./bots/CNNBrasilScrapper";
import EstadaoScrapper from "./bots/EstadaoScrapper";
import ExameEconomiaScrapper from "./bots/ExameEconomiaScrapper";
import G1GloboScrapper from "./bots/G1GloboScrapper";
import InfoMoneyScrapper from "./bots/InfoMoneyScrapper";
import MoneyTimesScrapper from "./bots/MoneyTimesScrapper";
import R7EconomiaScrapper from "./bots/R7EconomiaScrapper";
import UOLEconomiaScrapper from "./bots/UOLEconomiaScrapper";
import Scrapper from "./Scrapper";

class ScrappersManager {
    private scrappers: Scrapper[] = [];
    private UPDATE_DELAY = 1000 * 60 * 5; // 5 minutes
    constructor() {
        this.scrappers.push(new MoneyTimesScrapper());
        this.scrappers.push(new CNNBrasilScrapper());
        this.scrappers.push(new G1GloboScrapper());
        this.scrappers.push(new InfoMoneyScrapper());
        this.scrappers.push(new UOLEconomiaScrapper());
        this.scrappers.push(new EstadaoScrapper());
        this.scrappers.push(new ExameEconomiaScrapper());
        // this.scrappers.push(new R7EconomiaScrapper()); disabled for now (lots of shit ? )
    }

    public async start(): Promise<void> {
        for (const scrapper of this.scrappers) {
            console.log("====================================");
            await scrapper.scrape();
        }
        setTimeout(() => this.start(), this.UPDATE_DELAY);
    }
}

export default ScrappersManager;
