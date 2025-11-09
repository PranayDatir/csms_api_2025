import mongoose, { Document, Schema, Types, model } from 'mongoose';
import { Tables } from '../Shared/Constants/table';


export interface ITicketConversation extends Document {
    _id: Types.ObjectId;
    ticket_id: Types.ObjectId;
    media_type: "text" | "image" | "Pdf";
    srcContent: string;
    send_by: Types.ObjectId;
    reply_to_id: Types.ObjectId;
}

const ticketsConversationSchema: Schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    ticket_id: { type: mongoose.Schema.Types.ObjectId, require: true, ref: Tables.Ticket },
    media_type: { type: String, require: true, enum: ["text", "image", "Pdf"] },
    srcContent: { type: String, require: true },
    send_by: { type: mongoose.Schema.Types.ObjectId, require: true, ref: Tables.User },
    reply_to_id: { type: mongoose.Schema.Types.ObjectId, require: true, ref: Tables.User }
},
    {
        timestamps: true
    }
);

const TicketConversation = model<ITicketConversation>(Tables.TicketConversion, ticketsConversationSchema);

export default TicketConversation; 