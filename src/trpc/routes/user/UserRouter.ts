import { router } from "../../TRPCProvider";
import { AuthenticationRouter } from "./authenticaton/AuthenticationRouter";

export const UserRouter = router({
    authentication: AuthenticationRouter,
});
