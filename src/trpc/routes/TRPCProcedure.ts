import { AuthenticationMiddleware } from "../middleware/AuthenticationMiddleware";
import { publicProcedure } from "../TRPCProvider";

export const authenticatedProcedure = publicProcedure.use(AuthenticationMiddleware);
