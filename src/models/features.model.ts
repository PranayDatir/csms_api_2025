import mongoose, { Document, Schema, Types, model } from 'mongoose';
import { IUser } from './users.model';
import { Tables } from '../Shared/Constants/table';


export interface IFeature extends Partial<Document> {

    _id: string;
    title: string;
    description: string;
    tag: string;
    message?: string;
    isDisabled: boolean;
    isFeatureSelected: boolean;
    isRoleFeature: boolean;
    createdByUserId?: string | Types.ObjectId | IUser;
}

const FeatureSchema: Schema = new Schema(
    {
        _id: { type: String, required: true, trim: true },

        title: { type: String, required: true, unique: true, trim: true },
        description: { type: String, trim: true },
        tag: { type: String, trim: true },

        message: { type: String, trim: true },
        isDisabled: { type: Boolean, default: false },
        isFeatureSelected: { type: Boolean, default: false },
        isRoleFeature: { type: Boolean, default: false },
        createdByUserId: { type: mongoose.Schema.Types.ObjectId, ref: Tables.User },
    },
    {
        timestamps: true
    }
);
const features = model<IFeature>(Tables.Feature, FeatureSchema);

export default features;