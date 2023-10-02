import { User } from "../../database/documents/User";
import JWTService from "../../services/JWTService";
import { middleware } from "../TRPCProvider";

export const AuthenticationMiddleware = middleware(async (opts) => {
    // Parse the token from the request
    const token = opts.ctx.jwt;

    if (!token) {
        throw new Error("No token provided");
    }

    // Verify the token
    const decoded = JWTService.verifyToken(token);

    if (!decoded) {
        throw new Error("Invalid token");
    }

    // Add the user to the context
    const user = await User.findOne({ email: decoded.email });

    return opts.next({
        ...opts,
        ctx: {
            ...opts.ctx,
            user,
        },
    });
});
