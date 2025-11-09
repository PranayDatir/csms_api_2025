import { Response } from 'express';
import dotenv from 'dotenv';
import Ticket, { ITicket } from '../models/ticket.model';
import { TicketStatus } from '../Shared/Constants/ticketStatus';
import { CRequest } from '../Shared/Interfaces/Interface';
import { Role } from '../Shared/Constants/userRoles';
import { error } from 'console';

dotenv.config();

const raisedTicket = async (req: CRequest, res: Response) => {
    try {
        const username = `${req.user?.firstName} ${req.user?.lastName}`;
        const userId = req.user?._id;
        const userRole = req.user?.roleId;
        console.log("username--->", username);

        const { title, status, raised_by_email, raised_by_mobile, applicationInterfaceType } = req.body as ITicket;

        if (title && raised_by_email && raised_by_mobile && applicationInterfaceType && username && userId) {

            let ticket = new Ticket({
                title,
                status,
                raised_by_email,
                raised_by_mobile,
                raised_by_username: username,
                raised_by_role: userRole,
                applicationInterfaceType,
                raised_by_userTypeId: userId
            });
            ticket = await ticket.save();
            res.status(201).json({
                error: false,
                message: "Ticket raised successfully!",
                data: { ticket }
            });
        } else {
            res.send({ error: true, message: "All feilds are required." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const getAllTickets = async (req: CRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        let queryObj: any = {};

        switch (req.user?.roleId) {
            case Role.ADMIN:
                queryObj = {};
                break;
            case Role.SUPPORT:
                queryObj = {
                    $or: [{ assigned_to_userid: userId },
                    { status: TicketStatus.CREATED }]
                };
                break;
            case Role.CONSUMER:
                queryObj = {
                    raised_by_userTypeId: userId
                }
                break;
        }
        const allTickets = await Ticket.find(queryObj);
        res.status(200).json({ error: false, message: 'Success.', data: allTickets });
    } catch (error) {
        res.status(500).json({ error: true, message: "Error retrieving tickets" });
    }
};

const assignedToUserId = async (req: CRequest, res: Response) => {
    try {
        const ticketId = req.params.id;
        const { assigned_to_userid } = req.body;
        const userId = req.user?._id;
        if (!ticketId) {
            return res.status(200).json({ error: true, message: "Ticket Id is required." });
        }
        if (!assigned_to_userid) {
            return res.status(200).json({ error: true, message: "User ID is required." });
        }

        const ticket = await Ticket.findById(ticketId);
        if (ticket?.assigned_to_userid != null) {
            return res.status(200).json({ error: true, message: "Ticket is already assigned." })
        }

        const ticketFeilds = { ticketId, assigned_to_userid };
        for (const [field, value] of Object.entries(ticketFeilds)) {
            if (value === undefined) {
                return res.status(200).json({ error: true, message: `${field} is required` });
            }
        }

        let queryObj: any = {};

        switch (req.user?.roleId) {
            case Role.ADMIN:
                if (userId == assigned_to_userid) {
                    res.status(200).json({ error: true, message: 'You can not assigned ticket.' });
                } else {
                    queryObj = {
                        $set: {
                            assigned_to_userid: assigned_to_userid,
                            assigned_at: new Date(),
                            status: TicketStatus.ASSIGNED
                        }
                    };
                }
                break;
            case Role.SUPPORT:
                queryObj = {
                    $set: {
                        assigned_to_userid: userId,
                        assigned_at: new Date(),
                        status: TicketStatus.ASSIGNED
                    }
                };
                break;
        }

        const data = await Ticket.findByIdAndUpdate(ticketId, queryObj,
            { new: true });
        if (!data) {
            return res.status(200).json({ error: true, message: "Ticket not found" });
        }
        res.status(200).json({ error: false, message: "Ticket Assigned Successfully" });

    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

const deleteTicket = async (req: CRequest, res: Response) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(200).json({ error: true, message: 'Ticket not found' })
        }
        if (ticket.status === TicketStatus.ASSIGNED || ticket.status === TicketStatus.COMPLETED) {
            return res.status(200).json({ error: true, message: 'Cannot delete a assigned or completed ticket ' })
        }
        console.log('ticket---->', ticket)

        await Ticket.findByIdAndDelete(ticketId);
        res.status(200).json({ error: false, message: 'Ticket Deleted Successfully.' })

    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
}

export default { raisedTicket, getAllTickets, assignedToUserId, deleteTicket };

