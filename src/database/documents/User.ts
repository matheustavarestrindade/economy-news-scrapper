import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    _id: Types.ObjectId;

    email: string;
    password: string;

    name: string;

    comparePassword: (password: string) => Promise<boolean>;

    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    next();
});

UserSchema.method("comparePassword", function (password: string): boolean {
    const user = this as IUser;
    return bcrypt.compareSync(password, user.password);
});

export const User = model<IUser>("User", UserSchema);
