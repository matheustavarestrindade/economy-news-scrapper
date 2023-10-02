import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const ExpressContext = async (opts: CreateExpressContextOptions) => {
    const bearerToken = opts.req.headers.authorization;
    const token = bearerToken?.split(" ")[1];

    return {
        jwt: token,
    };
};

export type ExpressContextType = inferAsyncReturnType<typeof ExpressContext>;
