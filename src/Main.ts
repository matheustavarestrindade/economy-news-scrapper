import MongoDatabaseHandler from "./database/MongoDatabaseHandler";
import { config } from "dotenv";
import ScrappersManager from "./scrappers/ScrappersManager";
import RoutesManager from "./routes/RoutesManager";
config();

class Main {
    private mongo_database_handler: MongoDatabaseHandler;
    private scrapper_manager: ScrappersManager;
    private routers_manager: RoutesManager;

    constructor() {
        this.mongo_database_handler = new MongoDatabaseHandler(process.env.MONGO_DATABASE_URL || "mongodb://localhost:27017", process.env.MONGO_DATABASE_NAME || "news_scrapper");
        this.scrapper_manager = new ScrappersManager();
        this.routers_manager = new RoutesManager(Number(process.env.EXPRESS_SERVER_PORT || 3000));
        this.start();
    }

    public async start(): Promise<void> {
        try {
            await this.mongo_database_handler.connect();
            await this.routers_manager.startServer();
            await this.scrapper_manager.start();
        } catch (error) {
            throw error;
        }
    }
}

export const instance = new Main();

export default Main;
