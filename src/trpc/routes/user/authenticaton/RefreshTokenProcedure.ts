import JWTService from "../../../../services/JWTService";
import { authenticatedProcedure } from "../../TRPCProcedure";

export const RefreshTokenProcedure = authenticatedProcedure.mutation(async ({ ctx, input }) => {
    if (!ctx.user) {
        throw new Error("User not found");
    }

    const token = JWTService.generateToken({ email: ctx.user.email, username: ctx.user.name });

    return {
        token: token,
        user: {
            email: ctx.user.email,
            name: ctx.user.name,
        },
    };
});
