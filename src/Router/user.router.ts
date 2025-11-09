import express from 'express';
import userController from '../Controllers/userController';
import auth from '../middleware/auth';
import { Role } from '../Shared/Constants/userRoles';
import { Routes } from '../Shared/Constants/Route';

const userRouter = express.Router();

userRouter.post(Routes.LOGIN, userController.userLogin);
userRouter.get(Routes.REFRESHTOKEN, auth.checkAuthWeb, userController.refreshToken);
userRouter.post(Routes.USERS, auth.checkAuthWeb, userController.create);
userRouter.patch(`${Routes.USERS}/:id`,auth.checkAuthWeb, userController.editUserAccount);
userRouter.get(`${Routes.USERS}/:id`,auth.checkAuthWeb, userController.getSingleUser);
userRouter.get(Routes.USERS,auth.checkAuthWeb, userController.getMultipleUsers);

export default userRouter;
