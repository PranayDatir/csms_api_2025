import { NextFunction, Response } from 'express';
import Users from '../models/users.model';
import jwt from 'jsonwebtoken';
import { CRequest } from '../Shared/Interfaces/Interface';

const checkUserAuth = async (req: CRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: true, message: "Unauthorized user." });
    }
    const jwtToken = token.replace("Bearer", "").trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY as string) as { userId: string, email: string };
        const user = await Users.findById(isVerified.userId);
        req.user = user;
        next();
    } catch (error) {
        console.log("Middleware Auth -->", error);
        return res.status(401).json({ error: true, message: "Unauthorized user." });
    }
}

export const authorizeRoles = (...roles: string[]) => {
    return (req: CRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.roleId as string)) {
            return res.status(200).json({ error: true, message: "You don't have permission" });
        }
        next();
    };
};

export default checkUserAuth;