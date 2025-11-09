import { Request, Response } from 'express';
import dotenv from 'dotenv';
import UserRoles, { IUserRole } from '../models/userRole.model';
dotenv.config();

const createRole = async (req: Request, res: Response) => {
    try {
        const { name } = req.body as IUserRole;
        if (name) {
            const role = new UserRoles({
                name:name
            });
            await role.save();
            res.status(201).json({
                error: false,
                message: "Role Added successfully!"
            });
        } else {
            res.send({ error: true, message: "All feilds are required." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

export default {createRole};
