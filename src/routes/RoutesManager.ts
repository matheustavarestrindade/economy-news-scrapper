import express, { Express } from "express";
import cors from "cors";

class RoutesManager {
    private server: Express;
    private server_port: number;

    constructor(server_port: number) {
        this.server_port = server_port;
        this.server = express();
        this.server.use(cors());
    }

    public async startServer() {
    }

}

export default RoutesManager;
