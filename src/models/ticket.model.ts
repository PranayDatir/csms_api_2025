import mongoose, { Document, Schema, Types, model } from 'mongoose';
import { TicketStatus } from '../Shared/Constants/ticketStatus';
import { InterfaceType } from '../Shared/Constants/InterfaceType';
import { Tables } from '../Shared/Constants/table';


export interface ITicket extends Document {
    _id: Types.ObjectId,
    title: string;
    status: string;
    assigned_to_userid: string;
    assigned_at: string;
    raised_by_email: string;
    raised_by_mobile: number;
    raised_by_username: string;
    raised_by_role: string;
    raised_by_userTypeId: Types.ObjectId;
    applicationInterfaceType: string;
}

const ticketsSchema: Schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, require: true },
    // description: { type: String, require: true },
    status: {
        type: String,
        enum: [TicketStatus.CREATED, TicketStatus.ASSIGNED, TicketStatus.COMPLETED],
        require: true,
        default: TicketStatus.CREATED
    },
    assigned_to_userid: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        default: null,
        ref: Tables.User
    },
    assigned_at: {
        type: Date,
        require: true,
        default: null
    },
    raised_by_email: {
        type: String,
        require: true
    },
    raised_by_mobile: {
        type: String,
        require: true
    },
    raised_by_username: {
        type: String,
        require: true
    },
    raised_by_role: {
        type: String,
        require: true
    },
    raised_by_userTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: Tables.User
    },
    applicationInterfaceType: {
        type: String,
        default: InterfaceType.ANDROID,
        enum: [InterfaceType.ANDROID, InterfaceType.WEB, InterfaceType.IOS],
        require: true
    },

},
    {
        timestamps: true
    }
);
const Tickets = model<ITicket>(Tables.Ticket, ticketsSchema);

export default Tickets;
