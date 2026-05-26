import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-in-production";


export interface AuthRequest extends Request {
    user?: {
        id: number;
        nim: string;
    };
}


export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Format token tidak valid" });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; nim: string };


        req.user = {
            id: decoded.id,
            nim: decoded.nim,
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token tidak valid atau sudah kadaluarsa" });
    }
};
