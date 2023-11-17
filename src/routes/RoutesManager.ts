import express, { Express } from "express";
import cors from "cors";
import NewsRouter from "./NewsRouter";


class RoutesManager {
    private server: Express;
    private server_port: number;

    constructor(server_port: number) {
        this.server_port = server_port;
        this.server = express();
        this.server.use(cors());
    }

    public async startServer() {
       this.server.use("/news", NewsRouter); 
        this.server.listen(this.server_port, () => {
            console.log(`Server started on port ${this.server_port}`);
        });
    }

}

export default RoutesManager;
