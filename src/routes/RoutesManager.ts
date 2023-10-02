import express, { Express } from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { TRPCRouter } from "../trpc/TRPCAppRouter";
import { ExpressContext as createContext } from "../trpc/context/ExpressContext";

class RoutesManager {
    private server: Express;
    private server_port: number;

    constructor(server_port: number) {
        this.server_port = server_port;
        this.server = express();
        this.server.use(cors());
    }

    public async startServer() {
        await this.registerTRPC();

        this.server.listen(this.server_port, () => {
            console.info(`Server started at port ${this.server_port}`);
        });
    }

    private async registerTRPC() {
        this.server.use(
            "/trpc",
            trpcExpress.createExpressMiddleware({
                router: TRPCRouter,
                createContext,
            })
        );
    }
}

export default RoutesManager;
