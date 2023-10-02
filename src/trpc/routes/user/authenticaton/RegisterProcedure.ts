import { publicProcedure } from "../../../TRPCProvider";
import * as zod from "zod";
import { User } from "../../../../database/documents/User";
import { TRPCError } from "@trpc/server";
import JWTService from "../../../../services/JWTService";

const RegisterValidator = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    name: zod.string().min(3),
});

export const RegisterProcedure = publicProcedure.input(RegisterValidator).mutation(async ({ ctx, input }) => {
    const { email, password, name } = input;

    const user = await User.findOne({ email });
    if (user) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User already exists",
        });
    }

    const newUser = new User({
        email,
        password,
        name,
    });

    await newUser.save();

    return {
        token: JWTService.generateToken({ email: newUser.email, username: newUser.name }),
        user: {
            email: newUser.email,
            name: newUser.name,
        },
    };
});
