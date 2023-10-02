import { connect } from "mongoose";
import { ScrappedNews } from "./documents/ScrappedNews";

class MongoDatabaseHandler {
    database_url: string;
    database_name: string;
    constructor(database_url: string, database_name: string) {
        this.database_url = database_url;
        this.database_name = database_name;
        console.log(this.database_name, this.database_url);
    }

    public async connect(): Promise<void> {
        if (!this.database_url) throw new Error("Database URL is not defined");
        if (!this.database_name) throw new Error("Database name is not defined");
        try {
            await connect(this.database_url + "/" + this.database_name); 
            // Initialize collections
            await ScrappedNews.createCollection();
        } catch (error) {
            throw error;
        }
    }
}

export default MongoDatabaseHandler;
