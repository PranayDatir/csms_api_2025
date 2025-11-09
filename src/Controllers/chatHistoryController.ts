import { Response } from 'express';
import dotenv from 'dotenv';
import { CRequest } from '../Shared/Interfaces/Interface';
import TicketConversation, { ITicketConversation } from '../models/ticketConversation.model';
import Tickets from '../models/ticket.model';

dotenv.config();

const sendMessage = async (req: CRequest, res: Response) => {
    try {
        const sendByUserId = req.user?._id;
        const { ticket_id, media_type, srcContent, reply_to_id } = req.body as ITicketConversation;
        if (!ticket_id && !media_type && !srcContent && !reply_to_id) {
            return res.status(200).json({ error: true, message: `All feilds are required` })
        }
        const ticket = await Tickets.findById(ticket_id);

        if (!ticket) {
            return res.status(200).json({ error: true, message: 'ticket not found.' })
        }
        if (!ticket.assigned_to_userid) {
            return res.status(200).json({ error: true, message: 'Ticket is not assigned anyone.' });
        }
        const ticketConversation = new TicketConversation({
            ticket_id,
            media_type,
            srcContent,
            send_by: sendByUserId,
            reply_to_id
        });
        const conversation = await ticketConversation.save();
        return res.status(201).json({
            error: false, message: "Message sent successfully.", data: conversation
        });
    } catch (error) {
        console.log("MESSAGE ERROR--->", error);
        return res.status(500).json("Internal server error");
    }
}

const getAllMessages = async (req: CRequest, res: Response) => {
    try {
        // const id = req.params.id;
        // if (!id) {
        //     return res.status(200).json({ error: true, message: "User id is required." });
        // }

        const messages = await TicketConversation.find();
        res.status(200).json({ error: true, message: 'Success.', data: messages });
    } catch (error) {
        console.log("GET MESSAGE--->", error);
        res.status(500).json("Internal server error");
    }
}

export default { sendMessage, getAllMessages };