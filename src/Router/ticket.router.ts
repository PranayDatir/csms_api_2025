import express from 'express';
import checkUserAuth, { authorizeRoles } from '../middleware/auth';
import ticketController from '../Controllers/ticketController';
import { Role } from '../Shared/Constants/userRoles';
import { Routes } from '../Shared/Constants/Route';

const ticketRouter = express.Router();

ticketRouter.route(Routes.TICKET).post(checkUserAuth, authorizeRoles(Role.CONSUMER, Role.SUPPORT), ticketController.raisedTicket);
ticketRouter.route(Routes.TICKET).get(checkUserAuth, authorizeRoles(Role.ADMIN, Role.SUPPORT, Role.CONSUMER), ticketController.getAllTickets);
ticketRouter.route(Routes.TICKET + "/:id").patch(checkUserAuth, authorizeRoles(Role.ADMIN, Role.SUPPORT), ticketController.assignedToUserId);
ticketRouter.route(Routes.TICKET + "/:id").delete(checkUserAuth, authorizeRoles(Role.ADMIN, Role.CONSUMER), ticketController.deleteTicket);

export default ticketRouter;

