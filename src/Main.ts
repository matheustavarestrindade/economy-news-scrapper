import MongoDatabaseHandler from "./database/MongoDatabaseHandler";
import { config } from "dotenv";
import ScrappersManager from "./scrappers/ScrappersManager";
config();

class Main {
    private mongo_database_handler: MongoDatabaseHandler;
    private scrapper_manager: ScrappersManager;

    constructor() {
        this.mongo_database_handler = new MongoDatabaseHandler(process.env.MONGO_DATABASE_URL || "mongodb://localhost:27017", process.env.MONGO_DATABASE_NAME || "news_scrapper");
        this.scrapper_manager = new ScrappersManager();
        this.start();
    }

    public async start(): Promise<void> {
        try {
            await this.mongo_database_handler.connect();
            await this.scrapper_manager.start();
        } catch (error) {
            throw error;
        }
    }
}

export const instance = new Main();

export default Main;
