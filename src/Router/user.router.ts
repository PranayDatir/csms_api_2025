import express from 'express';
import userController from '../Controllers/userController';
import checkUserAuth, { authorizeRoles } from '../middleware/auth';
import { Role } from '../Shared/Constants/userRoles';
import { Routes } from '../Shared/Constants/Route';

const userRouter = express.Router();

userRouter.post(Routes.LOGIN, userController.userLogin);
userRouter.get(Routes.REFRESHTOKEN, checkUserAuth, userController.refreshToken);
userRouter.post(Routes.USERS, checkUserAuth, authorizeRoles(Role.ADMIN), userController.create);
userRouter.patch(`${Routes.USERS}/:id`, checkUserAuth, authorizeRoles(Role.ADMIN), userController.editUserAccount);
userRouter.get(`${Routes.USERS}/:id`, checkUserAuth, authorizeRoles(Role.ADMIN), userController.getSingleUser);
userRouter.get(Routes.USERS, checkUserAuth, authorizeRoles(Role.ADMIN), userController.getMultipleUsers);

export default userRouter;
