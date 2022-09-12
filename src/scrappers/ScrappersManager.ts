import CNNBrasilScrapper from "./bots/CNNBrasilScrapper";
import EstadaoScrapper from "./bots/EstadaoScrapper";
import G1GloboScrapper from "./bots/G1GloboScrapper";
import InfoMoneyScrapper from "./bots/InfoMoneyScrapper";
import UOLEconomiaScrapper from "./bots/UOLEconomiaScrapper";
import Scrapper from "./Scrapper";

class ScrappersManager {
    private scrappers: Scrapper[] = [];
    constructor() {
        this.scrappers.push(new CNNBrasilScrapper());
        this.scrappers.push(new G1GloboScrapper());
        this.scrappers.push(new InfoMoneyScrapper());
        this.scrappers.push(new UOLEconomiaScrapper());
        this.scrappers.push(new EstadaoScrapper());
    }

    public async start(): Promise<void> {
        for (const scrapper of this.scrappers) {
            console.log("====================================");
            const result = await scrapper.scrape();
            console.log("====================================");
        }
    }
}

export default ScrappersManager;
