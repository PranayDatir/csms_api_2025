import express from 'express';
import auth from '../middleware/auth';
import ticketController from '../Controllers/ticketController';
import { Role } from '../Shared/Constants/userRoles';
import { Routes } from '../Shared/Constants/Route';

const router = express.Router();

router.route(Routes.TICKET).post(auth.checkAuthWeb, ticketController.raisedTicket);
router.route(Routes.TICKET).get(auth.checkAuthWeb, ticketController.getAllTickets);
router.route(Routes.TICKET + "/:id").patch(auth.checkAuthWeb, ticketController.assignedToUserId);
router.route(Routes.TICKET + "/:id").delete(auth.checkAuthWeb, ticketController.deleteTicket);

export default router;

