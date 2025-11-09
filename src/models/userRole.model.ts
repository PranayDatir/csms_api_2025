import mongoose, { Document, Schema, Types, model } from 'mongoose';
import { Tables } from '../Shared/Constants/table';
import { IUser } from './users.model';

export interface IUserRole extends Partial<Document> {
    _id: string;
    name?: string;
    features: string[];
    featureId: string;
    // message?: string;
    isDisabled?: boolean;
    createdByUserId?: string | Types.ObjectId | IUser,
}

const UserRoleSchema: Schema = new Schema(
    {
        _id: { type: String, required: true, trim: true },
        name: { type: String, unique: true, },
        features: { type: [String], default: [] },
        featureId: { type: String, ref: Tables.Feature },
        // message: { type: String, trim: true },
        isDisabled: { type: Boolean, default: false },
        createdByUserId: { type: mongoose.Schema.Types.ObjectId, ref: Tables.User },
    },
    {
        timestamps: true
    }
);

const UserRoles = model<IUserRole>(Tables.UserRole, UserRoleSchema);

export default UserRoles;