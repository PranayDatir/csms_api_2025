import mongoose, { Document, Schema, Types, model } from 'mongoose';
import { Tables } from '../Shared/Constants/table';
import { Gender } from '../Shared/Constants/gender';
import { IUserRole } from './userRole.model';

export interface IUser extends Partial<Document> {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    mobile: string;
    roleId: Types.ObjectId | IUserRole | string;
    password: string;
    isDisabled: boolean;
}

const UserSchema: Schema = new Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        gender: { type: String, enum: [Gender.Male, Gender.Female, Gender.Others, Gender.PreferNotToSay], default: Gender.PreferNotToSay },
        email: { type: String, unique: true, lowercase: true, trim: true },
        mobile: { type: String, unique: true, trim: true },
        roleId: { type: String, ref: Tables.UserRole },
        password: { type: String, trim: true },
        isDisabled: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

export default model<IUser>(Tables.User, UserSchema);