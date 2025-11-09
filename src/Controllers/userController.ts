import { Request, Response } from 'express';
import Users, { IUser } from '../models/users.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CRequest, IPagination } from '../Shared/Interfaces/Interface';

dotenv.config();

const create = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, mobile, password, gender, roleId } = req.body;
        const userEmail = await Users.findOne({ email: email });
        const userMobile = await Users.findOne({ mobile: mobile });
        if (userEmail) {
            res.send({ error: true, message: "Email is already exists." });
        } else if (userMobile) {
            res.send({ error: true, message: "Mobile no is already exists." });
        } else {
            if (firstName && lastName && email && mobile && password && gender  && roleId) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const user = new Users({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobile: mobile,
                    password: hashPassword,
                    gender: gender,
                    role: roleId
                });
                await user.save();
                res.status(201).json({
                    error: false,
                    message: "User Registered successfully"
                });
            } else {
                res.send({ error: true, message: "All feilds are required." });
            }
        }
    } catch (error) {
        res.status(500).json({error:true,message: "Internal server error"});
    }
}

const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as IUser;
        if (!email && !password) {
            return res.status(200).json({ error: true, message: "email, password are required." });
        }
        const user = await Users.findOne({ email: email });
        if (user == null) {
            return res.status(200).json({ error: true, message: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if ((user.email === email) && isMatch) {
            console.log(user.roleId);

            //Generate JWT Token
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
            res.status(200).json({ error: false, message: "Login Successfully.", access_token: token, data: user });

        } else {
            res.status(200).json({ error: true, message: "Email or password is not valid" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const refreshToken = async (req: Request, res: Response) => {
    try {
        const authorizedToken = req.header('Authorization');
        if (!authorizedToken) {
            return res.status(403).send({ error: true, message: "Invalid Token" });
        }
        const trimToken = authorizedToken.replace("Bearer", "").trim();
        const isVerified = jwt.verify(trimToken, process.env.JWT_SECRET_KEY as string) as { email: string };
        const data = await Users.findOne({ email: isVerified.email });
        const jwtToken = jwt.sign({ userId: data?._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1d' });
        res.status(200).send({ error: false, access_token: jwtToken, data: data });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
};

const editUserAccount = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { firstName, lastName, email, mobile, gender, roleId } = req.body as IUser
        if (!id) {
            return res.status(200).json({ error: true, message: "User id is required." })
        }

        const requiredFields = { firstName, lastName, email, mobile, gender, roleId };
        for (const [field, value] of Object.entries(requiredFields)) {
            if (value === undefined) {
                return res.status(200).json({ error: true, message: `${field} is required` });
            }
        }
        const user = await Users.findById(id);
        console.log("user-->", user);
        if (!user) {
            return res.status(200).json({ error: true, message: "User not found." });
        }
        const updateUserData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            gender: gender,
            role: roleId
        };
        const data = await Users.findByIdAndUpdate(id,
            {
                $set: updateUserData
            }, { new: true });
        res.status(200).json({ error: false, message: "User updated successfully.", data });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(200).json({ error: true, message: "User id is required." });
        }
        const data = await Users.findById(id);
        if (!data) {
            return res.status(200).json({ error: true, message: "User not found." });
        }
        res.status(200).json({ error: false, message: "Success.", data })
    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const getMultipleUsers = async (req: Request, res: Response) => {
    let { currentPage, itemsPerPage } = (<any>req.query) as IPagination;
    try {
        if (!currentPage && !itemsPerPage) {
            const users = await Users.find();
            return res.status(200).json({ error: true, message: "Success.", data: users });
        }

        if (isNaN(currentPage) || currentPage < 0) {
            return res.status(200).json({ error: true, message: "currentPage must be a zero or positive number." });
        }
        if (isNaN(itemsPerPage) || itemsPerPage < 0) {
            return res.status(200).json({ error: true, message: "itemsPerPage must be a positive number." });
        }
        if (!currentPage) {
            return res.status(200).json({ error: true, message: "currentPage is required" })
        }
        if (!itemsPerPage) {
            return res.status(200).json({ error: true, message: "itemsPerPage is required" })
        }
        currentPage = Number(req.query.currentPage) || 0;
        itemsPerPage = Number(req.query.itemsPerPage) || 10;

        const skip = currentPage * itemsPerPage;

        const users = await Users.find()
            .skip(skip)
            .limit(itemsPerPage);
        const totalUsers = await Users.countDocuments();
        const totalPages = Math.ceil(totalUsers / itemsPerPage);
        if (currentPage > totalPages) {
            return res.status(200).json({ error: true, message: "Page number exceeds total number of pages." })
        }
        const nextPage: boolean = currentPage == totalPages ? false : true;
        const previousPage: boolean = currentPage == 1 ? false : true;

        res.status(200).json({
            error: false,
            message: "Success.",
            data: users,
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            totalUsers: totalUsers,
            totalPages: totalPages,
            nextPage: nextPage,
            previousPage: previousPage
        });
    } catch (error) {
        console.log("USER CONTROLLER-->", error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
};

const changePassword = async (req: CRequest, res: Response) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        const isMatch = await bcrypt.compare(oldPassword, user?.password as string);
        if (!isMatch) {
            return res.status(200).json({ error: true, message: "Current password is not valid." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const data = await Users.findByIdAndUpdate(user?.id,
            {
                $set: { password: hashPassword }
            }, { new: true });
        res.status(200).json({ error: false, message: "Password Updated Successfully.", data });
    } catch (error) {
        console.log("Change_Password-->", error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

export default { create, changePassword, userLogin, refreshToken, editUserAccount, getSingleUser, getMultipleUsers };

