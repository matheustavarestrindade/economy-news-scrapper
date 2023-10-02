"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password"))
        return next();
    var hashedPassword = bcrypt_1.default.hashSync(user.password, 10);
    user.password = hashedPassword;
    next();
});
UserSchema.method("comparePassword", function (password) {
    var user = this;
    return bcrypt_1.default.compareSync(password, user.password);
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
