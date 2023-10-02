import { authenticatedProcedure } from "../../TRPCProcedure";
import * as zod from "zod";
import { User } from "../../../../database/documents/User";
import JWTService from "../../../../services/JWTService";

const LoginValidationSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
});

export const LoginProcedure = authenticatedProcedure.input(LoginValidationSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input;

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    if (!user.comparePassword(password)) {
        throw new Error("Wrong password");
    }

    const safeUser = {
        email: user.email,
        name: user.name,
    };

    return {
        token: JWTService.generateToken({ email: user.email, username: user.name }),
        user: safeUser,
    };
});
