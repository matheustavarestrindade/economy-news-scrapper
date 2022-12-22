import express, { Express, Router } from "express";
import cors from "cors";
import NewsRouter from "./routers/NewsRouter";

class RoutesManager {
    private server: Express;
    private server_port: number;

    constructor(server_port: number) {
        this.server_port = server_port;
        this.server = express();
        this.server.use(cors());
    }

    public async startServer() {
        await this.registerRoutes();
        await this.registerMiddlewares();

        this.server.listen(this.server_port, () => {
            console.info(`Server started at port ${this.server_port}`);
        });
    }

    private async registerRoutes() {
        this.server.use("/news", NewsRouter);
    }

    private async registerMiddlewares() {}
}

export default RoutesManager;
