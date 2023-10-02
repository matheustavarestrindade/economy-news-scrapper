import { initTRPC } from "@trpc/server";
import { ExpressContextType } from "./context/ExpressContext";

const trpc = initTRPC.context<ExpressContextType>().create();

export const router = trpc.router;
export const middleware = trpc.middleware;

export const publicProcedure = trpc.procedure;
