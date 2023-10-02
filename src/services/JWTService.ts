import jwt from "jsonwebtoken";

export interface JWTPayload {
    email: string;
    username?: string;
}

class JWTService {
    static generateToken(payload: JWTPayload): string {
        const token = jwt.sign(payload, process.env.JWT_SECRET || "123", {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return token;
    }

    static verifyToken(token: string): JWTPayload | null {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "123");
            return decoded as JWTPayload;
        } catch (error) {
            return null;
        }
    }
}

export default JWTService;
