import { router } from "../../../TRPCProvider";
import { LoginProcedure } from "./LoginProcedure";
import { RefreshTokenProcedure } from "./RefreshTokenProcedure";
import { RegisterProcedure } from "./RegisterProcedure";

export const AuthenticationRouter = router({
    login: LoginProcedure,
    register: RegisterProcedure,
    refreshToken: RefreshTokenProcedure,
});
