import express from 'express';
import roleController from '../Controllers/roleController';
import checkUserAuth, { authorizeRoles } from '../middleware/auth';

const roleRouter = express.Router();

roleRouter.route("/createRole").post(checkUserAuth, authorizeRoles("Admin"),roleController.createRole);

export default roleRouter;